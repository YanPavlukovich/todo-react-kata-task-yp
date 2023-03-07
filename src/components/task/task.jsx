import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

const EditField = (props) => {
  const { editing, onSubmitHandler, description, onTaskEdit } = props;

  if (editing) {
    return (
      <form onSubmit={onSubmitHandler}>
        <input type="text" className="edit" value={description} onChange={onTaskEdit} />
      </form>
    );
  }
};

export default function Task(props) {
  const { completed, editing, id, description, createTime, onComplete, onEditStart, onDeleted, onEditEnd } = props;

  const onTaskEdit = (event) => {
    onEditEnd(event.target.value, id);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    onEditStart(true);
  };

  const classNames = [completed ? 'completed' : '', editing ? 'editing' : ''].join(' ');

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" id={`${id}__check`} onChange={onComplete} checked={completed} />
        <label htmlFor={`${id}__check`}>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(createTime)}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEditStart()} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>

      <EditField
        editing={editing}
        onSubmitHandler={onSubmitHandler}
        description={description}
        onTaskEdit={onTaskEdit}
      />
    </li>
  );
}
