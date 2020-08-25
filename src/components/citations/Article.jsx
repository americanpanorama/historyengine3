import React from 'react';
import PropTypes from 'prop-types';

const ArticleCitation = ({author, title, journal, volume, date, page}) => {
  return (
    <li>
      {(author) ? `${author}, `: ''}
      {(title) ? `"${title}"` : ''}
      {(journal) && (
        <em>{journal}</em>
      )}
      {(volume) ? ` ${volume} `: ''}
      {(date) ? `(${date})`: ''}
      {(page) ? `: ${page}`: ''}
    </li>
  )
}

export default ArticleCitation;
