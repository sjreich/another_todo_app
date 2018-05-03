import React from 'react'
import ErrorList from './ErrorList.js'
import TaskList from './TaskList.js'

class WholeThing extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: []
    };

    this.collectError = this.collectError.bind(this);
  }

  render () {
    return (
      <React.Fragment>
        <ErrorList errors={this.state.errors} />
        <TaskList
          initialTasks={this.props.initialTasks}
          errorCollector={this.collectError}
          csrfToken={this.props.csrfToken}
        />
      </React.Fragment>
    );
  }

  collectError (error) {
    const errors = this.state.errors;
    errors.push(error);
    this.setState({'errors': errors});
  }
}

export default WholeThing
