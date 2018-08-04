import React from 'react'
import ErrorList from './ErrorList.js'
import TaskList from './TaskList.js'
import Login from './Login.js'

class WholeThing extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: [],
      session: {},
    };

    this.collectError = this.collectError.bind(this);
    this.updateSession = this.updateSession.bind(this);
  }

  render () {
    return (
      <React.Fragment>
        <ErrorList errors={this.state.errors} />
        { this.main_content() }
      </React.Fragment>
    );
  }

  main_content () {
    if (this.state.session.user_id) {
      return (
        <TaskList
          initialTasks={this.props.initialTasks}
          errorCollector={this.collectError}
          csrfToken={this.props.csrfToken}
        />
      )
    } else {
      return (
        <Login
          csrfToken={this.props.csrfToken}
          sessionUpdater={this.updateSession}
        />
      )
    }
  }

  collectError (error) {
    const errors = this.state.errors;
    errors.push(error);
    this.setState({'errors': errors});
  }

  updateSession (params) {
    this.setState({'session': params});
  }
}

export default WholeThing
