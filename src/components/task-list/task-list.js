import React from 'react';

import Task from '../task';

import './task-list.css';

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      // eslint-disable-next-line react/jsx-key
      <li key={id} className="list-group-item">
        <Task {...itemProps} onDeleted={() => onDeleted(id)} />
      </li>
    );
  });
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TaskList;
