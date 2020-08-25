import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Async from "react-async";
import { Link, useParams } from "react-router-dom";
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import EpisodeSnippet from './EpisodeSnippet.jsx';
import './Tag.css';

const loadData = async ({ id }, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/tags/${id}.json`, { signal });
  if (!response.ok) { console.warn(response) }
  return response.json();
}

const Tag = (props) => {
  const { id } = useParams();

  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

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
          const episodes = data.episodes.slice(page * 10, page * 10 + 10);
          return (
            <div
              id='tag'
              key={`page${page}`}
            >
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
              
              <h3>{`Episodes tagged "${data.tag}"`}</h3>

               <div id='episodes'>
                  {episodes.map(episode => (
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

                {(page !== 0) && (
                  <button
                    onClick={() => setPage(page - 1)}
                  >
                    previous
                  </button>
                )}
                {(data.episodes.length > (page + 1) * 10) && (
                  <button
                    onClick={() => setPage(page + 1)}
                  >
                    next
                  </button>
                )}
            </div>
          )
        }
      }}
    </Async>
  );
};

export default Tag;
