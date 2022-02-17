import React from 'react';
import './App.css';
import EntryContainer from './components/EntryContainer';
import Header from './components/Header';
import Message from './components/Message';
import TaskContainer from './components/TaskContainer';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="App">
      <Message />
      <EntryContainer />
      <TaskForm />
      <Header />
      <TaskContainer />
    </div>
  );
}

export default App;
