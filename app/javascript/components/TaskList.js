import React from "react"
import PropTypes from "prop-types"
import request from "superagent"

class TaskList extends React.Component {
  load_tasks_from_server () {
    request
      .get('/api/tasks.json')
      .end((err, response) => {
        this.setState({tasks: response.body.tasks});
      })
  }

  constructor (props) {
    super(props);

    this.state = {
      tasks: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const task_id = target.getAttribute('task_id');

    this.setState((prevState, props) => {
      return prevState['tasks'].map(t => 
        t.id === parseInt(task_id) ? t.is_complete = value && t : t
      )
    });
  }

  componentDidMount () {
    this.load_tasks_from_server();
  }

  render () {
    return (
      <React.Fragment>
        <h3>My tasks</h3>
        <ul>
          {this.state.tasks.map((task) =>
            <li key={'task-' + task.id}>
              <label>
                {task.title}
                <input 
                  type="checkbox"
                  task_id={task.id}
                  checked={task.is_complete}
                  onChange={this.handleInputChange}
                />
              </label>
              <p>{task.description}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default TaskList
