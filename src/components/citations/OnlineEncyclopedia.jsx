import React from 'react';
import PropTypes from 'prop-types';

const OnlineEncyclopediaCitation = ({name, entry, url, date}) => {
  return (
    <li>
      {(name) && (
        <em>{name}</em>
      )}
      {(entry) ? `, s.v. "${entry}"`: ''}
      {(url) ? `, ${url} `: ''}
      {(date) ? ` (accessed ${date})`: ''}
    </li>
  )
}

export default OnlineEncyclopediaCitation;
