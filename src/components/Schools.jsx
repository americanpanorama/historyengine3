import React from 'react';
import { Async } from 'react-async';
import { Link } from 'react-router-dom';

const loadSchools = async ({}, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/schools.json`, { signal });
  if (!response.ok) { console.warn(`Error retrieving file: ${response}`); }
  return response.json();
};

const Schools = () => {
  return (
    <Async
      promiseFn={loadSchools}
    >
      {({ data, error, isPending }) => {
        if (isPending) return "Loading...";
        if (error) return `Something went wrong: ${error.message}`;
        if (data) {
          console.log(data);
          return (
            <ul id='schools'>
              <h2>Schools Using the History Engine</h2>
              <p>Click a school’s name below to view a list of past and present courses that contributed to the History Engine database.</p>
              {data
                .sort((a, b) => {
                  if (a.name < b.name) {
                    return -1
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0
                })
                .map(school => (
                  <li
                    key={`school${school.id}`}
                  >
                    <Link to={`/school/view/${school.id}`}>
                      {school.name}
                    </Link>
                  </li>
                ))
              }
            </ul>
          );
        }
      }}
    </Async>
  );
};

export default Schools;
