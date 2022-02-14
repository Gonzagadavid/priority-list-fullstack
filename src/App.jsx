import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import ConditionalComponent from './components/ConditionalComponent';
import EntryContainer from './components/EntryContainer';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';

function App() {
  const { logged } = useSelector((state) => state.appReducer);
  return (
    <div className="App">
      <ConditionalComponent condition={!logged}>
        <EntryContainer />
      </ConditionalComponent>
      <Header />
      <TaskContainer />
    </div>
  );
}

export default App;
