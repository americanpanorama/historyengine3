import React from 'react';
import PropTypes from 'prop-types';

const NewspaperArticleCitation = ({title, name, place, date, page}) => {
  // the place is ommitted in the case of very well known papers
  const wellKnownPapers = ['New York Times','New York Herald','Chicago Tribune','Wall Street Journal','Christian Science Monitor'];
  return (
    <li>
      {(title) ? `"${title}," `: ''}
      {(name) && (
        <em>{name}</em>
      )}
      {(place && !wellKnownPapers.includes(name)) ? `${place}`: ''}
      {(date) ? `, ${date} `: ''}
      {(page) ? `, ${page}`: ''}
    </li>
  );
}

export default NewspaperArticleCitation;
