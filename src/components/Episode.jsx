import React from 'react';
import PropTypes from 'prop-types';
import Async from "react-async";
import { Link, useParams } from "react-router-dom";
import { Map, TileLayer } from 'react-leaflet';
import BookCitation from './citations/Book';
import ArticleCitation from './citations/Article';
import LawCitation from './citations/Law';
import GovDocCitation from './citations/GovDoc';
import PamphletCitation from './citations/Pamplet';
import PrimaryInSecondaryDocCitation from './citations/PrimaryInSecondaryDoc';
import BookChapterCitation from './citations/BookChapter';
import WebsiteCitation from './citations/Website';
import OnlineEncyclopediaCitation from './citations/OnlineEncyclopedia';
import NewspaperArticleCitation from './citations/NewspaperArticle';
import DissertationOrThesisCitation from './citations/DissertationOrThesis';
import FilmCitation from './citations/Film';
import LectureCitation from './citations/Lecture';
import ArtifactCitation from './citations/Artifact';
import SimpleCitation from './citations/Simple';
import './Episode.css';

const loadData = async ({ id }, { signal }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/episodes/${id}.json`, { signal });
  if (!response.ok) { console.warn(response) }
  return response.json();
}

const Episode = (props) => {
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
            <div id='episode'>
              
                {(data.locations[0] && data.locations[0].lat) && (
                  <div id='map'>
                    <Map
                      center={[data.locations[0].lat, data.locations[0].lng]}
                      zoom={data.locations[0].zoom}
                    >
                      <TileLayer
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
                      />
                    </Map>
                  </div>
                )}
              
              <h3>{data.title}</h3>

              <div id='metadata'>
                <h4>Date(s):</h4>
                <div id='date'>
                  <Link to={`/timeline/${data.id}`}>
                    {data.display_date}
                  </Link>
                </div>
                <h4>Locations:</h4>
                <div id='locations'>
                  {data.locations.map(location => (
                    <Link
                      to={`/fips/view/${location.id}`}
                      key={`tag${location.id}`}
                    >
                      {location.place}
                    </Link>
                  ))}
                </div>
                <h4>Tag(s):</h4>
                <div id='tags'>
                  {data.tags.map(tag => (
                    <Link
                      to={`/tags/view/${tag.id}`}
                      key={`tag${tag.id}`}
                    >
                      {tag.tag}
                    </Link>
                  ))}
                </div>
                <h4>Course:</h4>
                <div>
                  <Link to={`/courses/view/${data.course_id}`}>
                    {data.course.name}
                  </Link>
                  {', '}
                  <Link to={`/schools/view/${data.course.school_id}`}>
                    {data.course.school}
                  </Link>
                </div>
              </div>

              <div id='content'>
                {data.content.map((p, idx) => (
                  <p
                    dangerouslySetInnerHTML={{ __html: p }}
                    key={`p${idx}`}
                  />
                ))}
              </div>

              {(data.citations.length > 0) && (
                <div id='citationsWrapper'>
                  <h5>Citations</h5>
                  <div id='citations'>
                    {data.citations.map(citation => (
                      <ul key={`citation${citation.divid}`}>
                        {(citation.type === 'Book') && (
                          <BookCitation
                            author={citation.data[0]}
                            title={citation.data[1]}
                            volume={citation.data[2]}
                            place={citation.data[3]}
                            publisher={citation.data[4]}
                            date={citation.data[5]}
                            page={citation.data[6]}
                          />
                        )}
                        {(citation.type === 'Article') && (
                          <ArticleCitation
                            author={citation.data[0]}
                            title={citation.data[1]}
                            journal={citation.data[2]}
                            volume={citation.data[3]}
                            date={citation.data[4]}
                            page={citation.data[5]}
                          />
                        )}
                        {(citation.type === 'Law') && (
                          <LawCitation
                            law={citation.data[0]}
                            date={citation.data[1]}
                            source={citation.data[2]}
                            place={citation.data[3]}
                            publisher={citation.data[4]}
                            year={citation.data[5]}
                            page={citation.data[6]}
                            sourceInfo={citation.data[7]}
                            url={citation.data[8]}
                          />
                        )}
                        {(citation.type === 'Government Document') && (
                          <GovDocCitation
                            name={citation.data[0]}
                            source={citation.data[1]}
                            date={citation.data[2]}
                            place={citation.data[3]}
                            publisher={citation.data[4]}
                            year={citation.data[5]}
                            page={citation.data[6]}
                            sourceInfo={citation.data[7]}
                            url={citation.data[8]}
                          />
                        )}
                        {(citation.type === 'Pamphlet or Other Printed Material') && (
                          <PamphletCitation
                            author={citation.data[0]}
                            title={citation.data[1]}
                            place={citation.data[3]}
                            publisher={citation.data[4]}
                            date={citation.data[5]}
                            location={citation.data[6]}
                          />
                        )}
                        {(citation.type === 'Manuscript on Microfilm' || citation.type === 'Manuscript') && (
                          <SimpleCitation
                            citationData={citation.data.filter(cd => typeof cd !== null && cd !== '')}
                          />
                        )}
                        {(citation.type === 'Primary Source in a Secondary Source') && (
                          <PrimaryInSecondaryDocCitation
                            name={citation.data[0]}
                            date={citation.data[1]}
                            title={citation.data[2]}
                            editor={citation.data[3]}
                            place={citation.data[4]}
                            publisher={citation.data[5]}
                            year={citation.data[6]}
                            page={citation.data[7]}
                          />
                        )}
                        {(citation.type === 'Chapter/Essay/Encyclopedia Entry  in Book') && (
                          <BookChapterCitation
                            author={citation.data[0]}
                            name={citation.data[2]}
                            title={citation.data[2]}
                            editor={citation.data[3]}
                            place={citation.data[4]}
                            publisher={citation.data[5]}
                            year={citation.data[6]}
                            page={citation.data[7]}
                          />
                        )}
                        {(citation.type === 'Website') && (
                          <WebsiteCitation
                            author={citation.data[0]}
                            name={citation.data[1]}
                            owner={citation.data[2]}
                            url={citation.data[3]}
                            date={citation.data[4]}
                          />
                        )}
                        {(citation.type === 'Online Encyclopedia') && (
                          <OnlineEncyclopediaCitation
                            name={citation.data[0]}
                            entry={citation.data[1]}
                            url={citation.data[2]}
                            date={citation.data[3]}
                          />
                        )}
                        {(citation.type === 'Newspaper Article') && (
                          <NewspaperArticleCitation
                            title={citation.data[0]}
                            name={citation.data[1]}
                            place={citation.data[2]}
                            date={citation.data[3]}
                            page={citation.data[4]}
                          />
                        )}
                        {(citation.type === 'Dissertation/Thesis') && (
                          <DissertationOrThesisCitation
                            author={citation.data[0]}
                            title={citation.data[1]}
                            type={citation.data[2]}
                            school={citation.data[3]}
                            year={citation.data[4]}
                            pages={citation.data[5]}
                          />
                        )}
                        {(citation.type === 'Film') && (
                          <FilmCitation
                            director={citation.data[0]}
                            title={citation.data[1]}
                            format={citation.data[2]}
                            date={citation.data[3]}
                            place={citation.data[4]}
                            distributor={citation.data[5]}
                            distributionDate={citation.data[6]}
                          />
                        )}
                        {(citation.type === 'Lecture, Conference Paper, etc.') && (
                          <LectureCitation
                            author={citation.data[0]}
                            title={citation.data[1]}
                            type={citation.data[2]}
                            sponsorship={citation.data[3]}
                            place={citation.data[4]}
                            date={citation.data[5]}
                          />
                        )}
                        {(citation.type === 'Artifact') && (
                          <ArtifactCitation
                            creation={citation.data[0]}
                            title={citation.data[1]}
                            type={citation.data[2]}
                            date={citation.data[3]}
                            collection={citation.data[4]}
                            repository={citation.data[5]}
                            location={citation.data[6]}
                          />
                        )}
                        {(citation.type === 'Image') && (
                          <ArtifactCitation
                            creation={citation.data[0]}
                            title={citation.data[1]}
                            type={citation.data[3]}
                            date={citation.data[2]}
                            repository={citation.data[5]}
                          />
                        )}
                      </ul>

                      
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }
      }}
    </Async>
  );
};

export default Episode;
