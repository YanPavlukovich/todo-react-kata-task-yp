import React, { Component } from 'react';

import './task.css';

export default class Task extends Component {
  state = {
    done: false,
  };

  onLabelClick = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  render() {
    const { label, onDeleted } = this.props;
    const { done } = this.state;

    let classNames = 'view';
    if (done) classNames += ' done';

    return (
      <div className={classNames}>
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description" onClick={this.onLabelClick.bind(this)}>
            {label}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
