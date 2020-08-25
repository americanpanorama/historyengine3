import React from 'react';
import PropTypes from 'prop-types';

const PrimaryInSecondaryCitation = ({name, date, title, editor, place, publisher, year, page}) => {
  return (
    <li>
      {(name) ? `"${name},"` : ''}
      {(date) ? ` ${date}` : ''}
      {(title) && (
        <React.Fragment>
          {', in '}
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

export default PrimaryInSecondaryCitation;
