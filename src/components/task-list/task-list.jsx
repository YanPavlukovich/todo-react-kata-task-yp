import React from 'react';

import Task from '../task';

import './task-list.css';

export default function TaskList(props) {
  const { tasks, onComplete, onDeleted, onEditStart, onEditEnd } = props;

  const taskElements = tasks.map((task) => (
    <Task
      {...task}
      key={task.id}
      onComplete={() => onComplete(task.id)}
      onDeleted={() => onDeleted(task.id)}
      onEditStart={(disabledAll) => onEditStart(task.id, disabledAll)}
      onEditEnd={(...args) => onEditEnd(...args)}
    />
  ));

  return <ul className="todo-list">{taskElements}</ul>;
}
