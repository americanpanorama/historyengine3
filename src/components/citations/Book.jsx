import React from 'react';
import PropTypes from 'prop-types';

const BookCitation = ({author, title, volume, place, publisher, date, page}) => {
  return (
    <li>
      {(author) ? `${author}, `: ''}
      {(title) && (
        <em>{title}</em>
      )}
      {(volume) ? `, ${volume} `: ''}
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
      {(page) ? `, ${page}`: ''}
    </li>
  )
}

export default BookCitation;
