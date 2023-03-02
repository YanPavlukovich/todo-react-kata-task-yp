import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  render() {
    return (
      <form onSubmit={() => this.props.onItemAdded('New Task')}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus />
      </form>
    );
  }
}
