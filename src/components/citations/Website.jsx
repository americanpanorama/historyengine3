import React from 'react';
import PropTypes from 'prop-types';

const WebsiteCitation = ({author, name, owner, url, date}) => {
  return (
    <li>
      {(author) ? `${author}, ` : ''}
      {(name) ? `"${name}"` : ''}
      {(owner) ? `, ${owner}`: ''}
      {(url) ? `, ${url} `: ''}
      {(date) ? ` (accessed ${date})`: ''}
    </li>
  )
}

export default WebsiteCitation;
