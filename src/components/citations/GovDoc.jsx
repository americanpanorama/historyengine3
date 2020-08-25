import React from 'react';
import PropTypes from 'prop-types';

const GovDocCitation = ({name, source, date, place, publisher, year, page, sourceInfo, url}) => {
  return (
    <li>
      {(name) && (
        <em>{name}</em>
      )}
      {(name && source) && (
        <React.Fragment>
          {', '}
        </React.Fragment>
      )}
      {(source) && (
        <em>{source}</em>
      )}
      {(date) ? ` (${date})` : ''}
      {(place || publisher || year) && (
        <React.Fragment>
          {' ('}
        </React.Fragment>
      )}
      {(place) ? `${place}: `: ''}
      {(publisher) ? `${publisher}`: ''}
      {(year) ? `${(publisher) ? ', ' : ''}${year}`: ''}
      {(place || publisher || year) && (
        <React.Fragment>
          )
        </React.Fragment>
      )}
      {(page) ? `, ${page}`: ''}
      {(sourceInfo) ? `, ${sourceInfo}`: ''}
      {(url) ? `, ${url}` : ''}
    </li>
  )
}

export default GovDocCitation;
