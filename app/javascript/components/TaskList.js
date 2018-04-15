import React from "react"
import request from "superagent"
import TaskItem from './TaskItem.js'

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
        if (error) {
          this.props.errorCollector(error);
          this.setState((prevState, props) => {
            const task_index = prevState['tasks'].findIndex(t => t.id === parseInt(task_id))
            const task = prevState['tasks'][task_index];
            task.is_complete = !is_complete;
            prevState['tasks'].splice(task_index, task);
          });
          this.forceUpdate();
        } else {
          this.setState((prevState, props) => {
            const task_index = prevState['tasks'].findIndex(t => t.id === parseInt(task_id))
            prevState['tasks'].splice(task_index, response.body.task);
          });
          this.forceUpdate();
        }
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
      const new_tasks = prevState['tasks'].map(t => {
        if (t.id === parseInt(task_id)) {
          t.is_complete = value;
        }
        return t;
      })
      return { tasks: new_tasks };
    });

    this.handleCompletionsOnServer(task_id, value);
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
              <TaskItem task={task} changeHandler={this.handleInputChange} />
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default TaskList;
