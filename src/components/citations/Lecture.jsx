import React from 'react';
import PropTypes from 'prop-types';

const LectureCitation = ({author, title, type, sponsorship, place, date}) => {
  return (
    <li>
      {(author) ? `${author}, `: ''}
      {(title) ? `"${title}" `: ''}
      {(type || sponsorship || place || date) ? ' (' : ''}
      {[type, sponsorship, place, date].filter(d =>d).join(', ')}
      {(type || sponsorship || place || date) ? ')' : ''}
    </li>
  );
}

export default LectureCitation;
