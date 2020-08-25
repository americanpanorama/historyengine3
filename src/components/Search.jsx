import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import lunr from 'lunr';
import Async from "react-async";
import { useParams } from "react-router-dom";
import EpisodeSnippet from './EpisodeSnippet.jsx';

const loadIndex = async ({}, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/searchIndex.json`, { signal });
  if (!response.ok) { console.warn(response) }
  return response.json();
}

const loadEpisodes = async({ ids }, { signal }) => {
  const responses = await Promise.all(
    ids.map(id => fetch(`${process.env.PUBLIC_URL}/data/episodes/${id}.json`), { signal})
  );
  if (responses.some(res => !res.ok)) { console.warn(responses) };
  const results = [];
  return [
    await responses[0].json(),
    await responses[1].json(),
    await responses[2].json(),
    await responses[3].json(),
    await responses[4].json(),
    await responses[5].json(),
    await responses[6].json(),
    await responses[7].json(),
    await responses[8].json(),
    await responses[9].json(),
  ];
};

const Search = (props) => {
  const { searchTerms } = useParams();

  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <Async
      promiseFn={loadIndex}
    >
      {({ data, error, isPending }) => {
        if (isPending) return "Searching...";
        if (error) return `Something went wrong: ${error.message}`;
        if (data) {
          const idx = lunr.Index.load(data);

          const searchResults = idx.search(searchTerms);

          const idsToRetrieve = searchResults
            .slice(page * 10, page * 10 + 10)
            .map(d => parseInt(d.ref));

          return (
            <div id='search'>
              

              <Async
                promiseFn={loadEpisodes}
                ids={idsToRetrieve}
                watch={page}
              >
                {(episodeResults) => {
                  if (episodeResults.isPending) return "Searching...";
                  if (episodeResults.error) return `Something went wrong: ${episodeResults.error.message}`;
                  if (episodeResults.data) {
                    return (
                      <div id='results'>
                        <h2>
                          {`Showing Results ${page * 10 + 1}-${page * 10 + 10} of ${searchResults.length}`}
                        </h2>
                        <div id='episodes'>
                          {episodeResults.data.map(episode => (
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
                        {(searchResults.length > (page + 1) * 10) && (
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
            </div>
          );
        }
      }}
    </Async>
  );
}

export default Search;
