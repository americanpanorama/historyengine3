import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Async, useFetch, useAsync } from "react-async";
import { useParams } from "react-router-dom";
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import EpisodeSnippet from './EpisodeSnippet.jsx';
import DatesIndex from '../../data/dates.json';
import './Date.css';

const loadEpisodes = async({ ids }, { signal }) => {
  const responses = await Promise.all(
    ids.map(id => fetch(`${process.env.PUBLIC_URL}/data/episodes/${id}.json`), { signal})
  );
  if (responses.some(res => !res.ok)) { console.warn(responses) };
  const results = [];
  return await Promise.all(
    responses.map(response => response.json())
  );
  // return [
  //   await responses[0].json(),
  //   await responses[1].json(),
  //   await responses[2].json(),
  //   await responses[3].json(),
  //   await responses[4].json(),
  //   await responses[5].json(),
  //   await responses[6].json(),
  //   //await responses[7].json(),
  //   // await responses[8].json(),
  // ];
};

const Timeline = (props) => {
  const { id } = useParams();

  const [centeredId, setCenteredId] = useState(parseInt(id));

  const episodesRef = useRef();

  const idx = DatesIndex.findIndex(d => d.id === parseInt(id));

  const centeredIdx = DatesIndex.findIndex(d => d.id === parseInt(centeredId));

  const idsToRetrieve = DatesIndex
    .slice(Math.max(0, idx - 3), Math.min(DatesIndex.length - 1, idx + 4))
    .map(d => d.id);

  let { data, error, isPending } = useAsync({ 
    promiseFn: loadEpisodes,
    ids: idsToRetrieve,
    watch: id,
  });


  useEffect(() => {
    if (episodesRef && episodesRef.current) {
      select(episodesRef.current)
      .transition()
      .duration(500)
      .style('transform', `translateX(0px)`)
      .on('end', () => {
        setCenteredId(id);
      })
      .on('cancel', () => {
        setCenteredId(id);
      });
    }
  });

  if (error) return error.message;
  if (data) {
    // pad with empty elements at the beginning and end of the timeline
    if (idx <= 4) {
      data = [
        ...new Array(7 - data.length),
        ...data
      ];
    } else if (idx > DatesIndex.length - 3) {
      data = [
        ...data,
        ...new Array(7 - data.length),
      ]
    }

    const idxOfCentered = data.findIndex(d => d && d.id === parseInt(centeredId));

    let translateX = 0;
    if (idxOfCentered < 3) {
      translateX = 270;
    } else if (idxOfCentered > 3) {
      translateX = -270;
    }

    return (
      <div id='timeline'>
        <div
          id='episodes'
          style={{
            transform: `translateX(${translateX}px)`,
          }}
          ref={episodesRef}
        >
          {data.map((episode, idx) => {
            if (!episode) {
              return (
                <div 
                  className='episodeCard'
                  key={`blank${idx}`}
                />
              );
            }
            const [year, month, day] = episode.search_date.split('-').map(d => parseInt(d));
            return (
              <div
                className='episodeCard'
                key={`episode${episode.id}`}
                style={{
                  backgroundColor: (episode.id === 5799) ? 'black' : 'white',
                }}
              >
                <div className='date'>
                  {`${month}/${day}/${year}`}
                </div>
                <Link
                  to={`/episodes/view/${episode.id}`}
                >
                  <EpisodeSnippet
                    {...episode}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        {(idx > 0 && data[2] && data[2].id) && (
          <button
            //onClick={() => { setCenteredId(data[2].id) }}
            className='previous'
          >
            <Link
              to={`/timeline/${data[2].id}`}
            >
              previous
            </Link>
          </button>
        )}

        {(data[4] && data[4].id) && (
          <button
            //onClick={() => { setCenteredId(data[2].id) }}
            className='next'
          >
            <Link to={`/timeline/${data[4].id}`}>
              next
            </Link>
          </button>
        )}
      </div>
    );
  }

  return null;
   
}

export default Timeline;
