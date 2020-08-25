import React from 'react';
import PropTypes from 'prop-types';

const LawCitation = ({law, date, source, place, publisher, year, page, sourceInfo, url}) => {
  return (
    <li>
      {(law) ? `${law}`: ''}
      {(date) ? ` (${date})` : ''}
      {(source) && (
        <em>{source}</em>
      )}
      {(publisher) ? `, ${publisher} `: ''}
      {(year) ? `, (${year})`: ''}
      {(page) ? `, ${page}`: ''}
      {(sourceInfo) ? `, ${sourceInfo}`: ''}
      {(url) ? ` (${url})` : ''}
    </li>
  )
}

export default LawCitation;
