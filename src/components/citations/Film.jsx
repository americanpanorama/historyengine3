import React from 'react';
import PropTypes from 'prop-types';

const FilmCitation = ({director, title, format, date, place, distributor, distributionDate}) => {
  return (
    <li>
      {(title) && (
        <em>{title}</em>
      )}
      {(format) ? `, ${format}`: ''}
      {(director) ? `, directed by ${director}`: ''}
      {(date || place || distributor || distributionDate) ? ' (' : ''}
      {(date) ? `${date}` : ''}
      {(place || distributor || distributionDate) ? '; ' : ''}
      {(place) ? `${place}`: ''}
      {(place && distributor) ? ': ' : ''}
      {(distributor) ? `, ${distributor}`: ''}
      {((place || distributor) && distributionDate) ? `, ${distributionDate}` : ''}
      {(date || place || distributor || distributionDate) ? ')' : ''}
    </li>
  );
}

export default FilmCitation;
