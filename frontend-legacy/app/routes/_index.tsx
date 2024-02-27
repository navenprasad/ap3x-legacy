import React, { useState, useEffect } from 'react';

import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';

export default function Index() {
  const [todolistItems, setTodolistItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch TodoListItems from the server
  useEffect(() => {
    const fetchTodoListItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/todo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodolistItems(data); // Assuming the response data is the array of TodoListItems
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchTodoListItems();
  }, []); // The empty array as a second argument ensures this effect runs only once after initial render

  const addTodolistItem = () => {
    if (!inputValue.trim()) return;
    // Here you might want to add code to post the new item to the server as well
    setTodolistItems([
      ...todolistItems,
      { title: inputValue.trim(), completed: false },
    ]);
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
          placeholder="Add a new todolist item"
          style={{ marginRight: '0.5rem' }}
        />
        <Button onClick={addTodolistItem}>Add Todolist Item</Button>
      </div>
      <ul>
        {todolistItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.completed ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
    </div>
  );
}
