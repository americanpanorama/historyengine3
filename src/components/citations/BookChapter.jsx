import React from 'react';
import PropTypes from 'prop-types';

const BookChapterCitation = ({author, name, title, editor, place, publisher, year, page}) => {
  return (
    <li>
      {(author) ? `${author}, ` : ''}
      {(name) ? `"${name}"` : ''}
      {(title) && (
        <React.Fragment>
          {' in '}
          <em>{title}</em>
        </React.Fragment>
      )}
      {(editor) ? `, ed. ${editor}: `: ''}
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
    </li>
  )
}

export default BookChapterCitation;
