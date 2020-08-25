import React from 'react';
import PropTypes from 'prop-types';
import Async from "react-async";
import { Link, useParams } from "react-router-dom";
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import EpisodeSnippet from './EpisodeSnippet.jsx';
import './Tag.css';

const loadData = async ({ id }, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/courses/${id}.json`, { signal });
  if (!response.ok) { console.warn(response) }
  return response.json();
}

const Course = (props) => {
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
          return (
            <div id='tag'>
              <div id='map'>
                <Map
                  bounds={data.bounds}
                >
                  <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
                  />
                  {data.points.map(point => (
                    <CircleMarker
                      center={point}
                      radius={3}
                      key={`coord${point.join('-')}`}
                    />
                  ))}
                </Map>
              </div>
              
              <h3>{data.title}</h3>
              <h5>
                {data.term}
                {' | '}
                <Link to={`/school/view/${data.school_id}`}>
                  {data.school_name}
                </Link>
              </h5>
``
              <h4>Episodes</h4>
              <div id='episodes'>
                {data.episodes.map(episode => (
                  <Link
                    to={`/episodes/view/${episode.id}`}
                    key={`episode${episode.id}`}
                  >
                    <EpisodeSnippet
                      {...episode}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
        }
      }}
    </Async>
  );
};

export default Course;
