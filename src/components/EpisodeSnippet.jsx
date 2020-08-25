import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EpisodeSnippet = (props) => {
  const {
    id,
    title,
    content,
    locations,
    display_date,
    tags,
  } = props;

  return (
    <div className='episodeSnippet'>
      <h2
        dangerouslySetInnerHTML={{__html: title}}
      />
      <div id='metadata'>
        <label>
          Date(s):
        </label>
        <span className='data'>
          {display_date}
        </span>
        <label>
          Location(s):
        </label>
        <span className='data'>
          {locations.map(location => location.place).join(', ')}
        </span>
       <label>
          Tag(s):
        </label>
        <span className='data'>
          {tags.map(tag => tag.tag).join(', ')}
        </span>


      </div>
      {(content && content[0]) && (
        <div
          className='content'
          dangerouslySetInnerHTML={{__html: content[0]}}
        />
      )}
    </div>
  )
};

export default EpisodeSnippet;

EpisodeSnippet.defaultProps = {
  tags: [],
  location: [],
}
