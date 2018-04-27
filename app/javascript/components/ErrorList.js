import React from 'react'

class ErrorList extends React.Component {
  render () {
    const errors = this.props.errors;
    if (errors.length < 1) { return null; }

    return (
      <div>
        <h5>Errors:</h5>
        <ul>
          {errors.map(error => 
            <li key={'error-' + errors.indexOf(error)}>
              <p>{error.message}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ErrorList;
