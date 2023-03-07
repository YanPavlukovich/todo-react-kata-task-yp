import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  state = {
    tasks: [],
    activeFilter: 'all',
    filters: [
      { label: 'All', param: 'all', active: true },
      { label: 'Active', param: 'active', active: false },
      { label: 'Completed', param: 'completed', active: false },
    ],
  };

  createTask = (label) => ({
    description: label,
    createTime: new Date(),
    completed: false,
    editing: false,
    id: uuidv4(),
  });

  toggleProperty = (array, id, property) => {
    const elementIndex = array.findIndex((el) => el.id === id);
    const element = array[elementIndex];

    const newElement = {
      ...element,
      [property]: !element[property],
    };

    return [...array.slice(0, elementIndex), newElement, ...array.slice(elementIndex + 1, array.length)];
  };

  getFilteredTasks = () => {
    const { activeFilter, tasks } = this.state;

    if (activeFilter === 'all') {
      return tasks;
    }
    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (activeFilter === 'active') {
      return tasks.filter((task) => !task.completed);
    }
  };

  completeTaskHandler = (id) => {
    this.setState((state) => ({
      tasks: this.toggleProperty(state.tasks, id, 'completed'),
    }));
  };

  deleteTaskHandler = (id) => {
    this.setState(() => ({
      tasks: this.state.tasks.filter((task) => task.id !== id),
    }));
  };

  editStartTaskHandler = (id, disabledAll) => {
    console.log(disabledAll);
    this.setState((state) => {
      const tasks = state.tasks.map((task) => ({
        ...task,
        editing: disabledAll ? false : task.id === id,
      }));

      return {
        tasks,
      };
    });
  };

  editEndTaskHandler = (value, id) => {
    this.setState((state) => {
      const tasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        } else {
          return {
            ...task,
            description: value,
          };
        }
      });

      return {
        tasks,
      };
    });
  };

  onTaskCreate = (label) => {
    this.setState((state) => ({ tasks: [this.createTask(label), ...state.tasks] }));
  };

  onClearActive = () => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    }));
  };

  filterHandler = (param) => {
    this.setState((state) => {
      const filters = state.filters.map((filter) => ({
        ...filter,
        active: filter.param === param,
      }));

      return {
        filters,
        activeFilter: param,
      };
    });
  };

  endOfEditedAllChildren = (e) => {
    if (!e.target.closest('.icon-edit') && !e.target.closest('.edit')) {
      this.setState((state) => {
        return {
          tasks: state.tasks.map((task) => ({
            ...task,
            editing: false,
          })),
        };
      });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.endOfEditedAllChildren);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.endOfEditedAllChildren);
  }

  render() {
    const { tasks, filters } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const todoCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskCreate={this.onTaskCreate} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onComplete={this.completeTaskHandler}
            onDeleted={this.deleteTaskHandler}
            onEditStart={this.editStartTaskHandler}
            onEditEnd={this.editEndTaskHandler}
          />
        </section>
        <Footer
          todoCount={todoCount}
          onFilter={this.filterHandler}
          filters={filters}
          onClearActive={this.onClearActive}
        />
      </section>
    );
  }
}
