import React from "react"
import request from "superagent"
import TaskItem from './TaskItem.js'

class TaskList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      tasks: this.props.initialTasks
    };

    this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
  }

  render () {
    return (
      <div>
        <h3>My tasks</h3>
        <ul>
          {this.state.tasks.map((task) =>
            <li key={'task-' + task.id}>
              <TaskItem task={task} statusToggler={this.toggleTaskStatus} />
            </li>
          )}
        </ul>
      </div>
    );
  }

  toggleTaskStatus(event) {
    const task_id = parseInt(event.target.getAttribute('task_id'));
    const is_checked = event.target.checked;

    this.setState((prevState, props) => {
      const new_tasks = prevState['tasks'].map(task => {
        if (task.id === task_id) { task.is_complete = is_checked; }
        return task;
      })
      return { tasks: new_tasks };
    });

    this.toggleTaskStatusOnServer(task_id, is_checked);
  }

  toggleTaskStatusOnServer(task_id, is_complete) {
    request
      .patch(`/api/tasks/${task_id}.json`)
      .set('X-CSRF-Token', this.props.csrfToken)
      .send({task: {is_complete: is_complete} })
      .end((error, response) => {
        const tasks = this.state['tasks'];
        const task_index = tasks.findIndex(t => t.id === parseInt(task_id));

        if (error) {
          this.props.errorCollector(error);
          tasks[task_index].is_complete = !is_complete;
        } else {
          tasks[task_index] = response.body.task;
        }

        this.setState({'tasks': tasks});
      })
  }
}

export default TaskList;
