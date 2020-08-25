import React from 'react';
import PropTypes from 'prop-types';

const ArtifactCitation = ({creator, title, type, date, collection, respository, location}) => {
  return (
    <li>
      {(creator) ? `${creator}, `: ''}
      {(title) ? `"${title}" `: ''}
      {(type || date || collection || respository || location) ? ' (' : ''}
      {[type, date, collection, respository || location].filter(d =>d).join(', ')}
      {(type || date || collection || respository || location) ? ')' : ''}
    </li>
  );
}

export default ArtifactCitation;
