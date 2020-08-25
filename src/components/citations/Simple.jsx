import React from 'react';
import PropTypes from 'prop-types';

const SimpleCitation = ({citationData}) => {
  return (
    <li>
      {citationData.join(', ')}
    </li>
  )
}

export default SimpleCitation;
