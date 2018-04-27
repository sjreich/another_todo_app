import React from 'react'
import TaskList from './TaskList.js'

class WholeThing extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: []
    };

    this.errorCollector = this.errorCollector.bind(this);
  }

  render () {
    return (
      <React.Fragment>
        { this.state.errors.length >= 1 &&
          <div>
            <h5>Errors:</h5>
            <ul>
              {this.state.errors.map(error => 
                <li key={'error-' + this.state.errors.indexOf(error)}>
                  <p>{error.message}</p>
                </li>
              )}
            </ul>
          </div>
        }
        <TaskList
          initialTasks={this.props.initialTasks}
          errorCollector={this.collectError}
          csrfToken={this.props.csrfToken}
        />
      </React.Fragment>
    );
  }

  collectError (error) {
    this.setState((prevState, props) => {
      prevState['errors'].push(error);
    });
    this.forceUpdate();
  }
}

export default WholeThing
