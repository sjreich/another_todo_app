import React from "react"

class TaskItem extends React.Component {
  render () {
    const task = this.props.task;

    return (
      <React.Fragment>
        <label>
          {task.title}
          <input 
            type="checkbox"
            task_id={task.id}
            checked={task.is_complete}
            onChange={this.props.statusToggler}
          />
        </label>
        <p>{task.description}</p>
      </React.Fragment>
    )
  }
}

export default TaskItem;