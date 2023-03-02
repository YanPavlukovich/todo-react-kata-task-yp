import React from 'react';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

import './app.css';

function App() {
  const todoData = [
    { id: 1, label: 'Completed task' },
    { id: 2, label: 'Editing task' },
    { id: 3, label: 'Active task' },
  ];
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
      </section>
      <Footer />
    </section>
  );
}

export default App;
