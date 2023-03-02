import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

import './app.css';

const UNIQUE_ID = uuidv4();

export default class App extends Component {
  state = {
    todoData: [
      { id: 1, label: 'Completed task', completed: false },
      { id: 2, label: 'Editing task', completed: false },
      { id: 3, label: 'Active task', completed: false },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);

      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      completed: false,
      id: UNIQUE_ID,
    };

    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];

      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} />
        </section>
        <Footer />
      </section>
    );
  }
}
