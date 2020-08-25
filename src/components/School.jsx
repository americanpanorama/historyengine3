import React from 'react';
import PropTypes from 'prop-types';
import Async from "react-async";
import { Link, useParams } from "react-router-dom";

const loadData = async ({ id }, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/schools/${id}.json`, { signal });
  return response.json();
}

const School = (props) => {
  const { id } = useParams();

  return (
    <Async
      promiseFn={loadData}
      id={id}
      watch={id}
    >
      {({ data, error, isPending }) => {
        if (isPending) return "Loading...";
        if (error) return `Something went wrong: ${error.message}`;
        if (data) {
          console.log(data);
          return (
            <div id='school'>              
              <h3>{data.name}</h3>

              <div>URL: {data.url}</div>

               <ul id='courses'>
                  {data.courses.map(course => (
                    <li key={`course${course.id}`}>
                      <Link
                        to={`/courses/view/${course.id}`}
                      >
                        {`${course.title} (${course.term})`}
                      </Link>

                    </li>
                  ))}
                </ul>
            </div>
          )
        }
      }}
    </Async>
  );
};

export default School;
