import React from 'react';
import PropTypes from 'prop-types';

const DissertationOrThesisCitation = ({author, title, type, school, year, page}) => {
  return (
    <li>
      {(school) ? `${school}`: ''}
      {(title) ? `"${title}," `: ''}
      {(type || school || year) ? ' (' : ''}
      {[type, school, year].filter(d =>d).join(', ')}
      {(type || school || year) ? ')' : ''}
      {(page) ? `, ${page}`: ''}
    </li>
  );
}

export default DissertationOrThesisCitation;
