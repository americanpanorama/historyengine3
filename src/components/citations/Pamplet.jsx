import React from 'react';
import PropTypes from 'prop-types';

const PamphletCitation = ({author, title, place, publisher, date, location}) => {
  // location is ignored; see Chicago 15 17.241
  return (
    <li>
      {(author) ? `${author}, `: ''}
      {(title) && (
        <em>{title}</em>
      )}
      {(place || publisher || date) && (
        <React.Fragment>
          {' ('}
        </React.Fragment>
      )}
      {(place) ? `${place}: `: ''}
      {(publisher) ? `${publisher}`: ''}
      {(date) ? `${(publisher) ? ', ' : ''}${date}`: ''}
      {(place || publisher || date) && (
        <React.Fragment>
          )
        </React.Fragment>
      )}
    </li>
  )
}

export default PamphletCitation;
