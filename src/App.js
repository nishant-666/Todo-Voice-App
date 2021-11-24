import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import alanBtn from "@alan-ai/alan-sdk-web";
import { app, database } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
function App() {
  const databaseRef = collection(database, 'todo-list');
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    alanBtn({
      key: '86e866fbe49666abd385ee5c9f9cbf5c2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        addDoc(databaseRef, { item: commandData.data })
        .then(() => {
          setUpdate(true);
        })
      }
    });
  }, []);
  return (
    <div className='todo-app'>
      <TodoList databaseRef={databaseRef} setUpdate={setUpdate} update={update}/>
    </div>
  );
}

export default App;
