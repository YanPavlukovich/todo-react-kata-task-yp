import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

import './footer.css';

export default class Footer extends Component {
  static defaultProperties = {
    todoCounter: 0,
    onFilter: () => {},
    onClearActive: () => {},
  };

  static propertiesTypes = {
    todoCounter: PropTypes.number,
    onFilter: PropTypes.func,
    onClearActive: PropTypes.func,
  };

  render() {
    const { todoCounter, onFilter, onClearActive, filters } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todoCounter} items left</span>

        <TasksFilter onFilter={onFilter} filters={filters} />

        <button className="clear-completed" onClick={onClearActive}>
          Clear completed
        </button>
      </footer>
    );
  }
}
