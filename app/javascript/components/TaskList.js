import React from "react"
import PropTypes from "prop-types"
import request from "superagent"

class TaskList extends React.Component {
  getCSRFToken() {
    const meta_tags = document.getElementsByTagName('meta');
    const csrf_tag = meta_tags.namedItem('csrf-token');

    return csrf_tag.content;
  }

  load_tasks_from_server () {
    request
      .get('/api/tasks.json')
      .end((err, response) => {
        this.setState({tasks: response.body.tasks});
      })
  }

  handleCompletionsOnServer(task_id, is_complete) {
    request
      .patch(`/api/tasks/${task_id}.json`)
      .set('X-CSRF-Token', this.getCSRFToken())
      .send({task: {is_complete: is_complete} })
      .end((error, response) => {
        if error { return false; }
        this.setState((prevState, props) => {
          const task_index = prevState['tasks'].indexOf(t => t.id === parseInt(task_id))
          prevState['tasks'].splice(task_index, response.body.task);
        })
        return true;
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

    const priorState = this.state;

    this.setState((prevState, props) => {
      return prevState['tasks'].map(t => 
        t.id === parseInt(task_id) ? t.is_complete = value && t : t
      )
    });

    const was_failure = this.handleCompletionsOnServer(task_id, value);
    if was_failure {
      this.setState(priorState);
    }
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
