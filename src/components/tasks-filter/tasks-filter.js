import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TaskFilter extends Component {
  static propertiesTypes = {
    onFilter: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
  };

  render() {
    const { onFilter, filters } = this.props;

    const filtersElements = filters.map((filter) => (
      <li key={filter.param}>
        <button type="button" className={filter.active ? 'selected' : ''} onClick={() => onFilter(filter.param)}>
          {filter.label}
        </button>
      </li>
    ));

    return <ul className="filters">{filtersElements}</ul>;
  }
}
