import React, { useState } from 'react';

import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, inputValue.trim()]);
    setInputValue('');
  };

  return (
    <div>
      <div>
        <h1>Welcome to ap3x</h1>
      </div>
      <div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          style={{ marginRight: '0.5rem' }}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
