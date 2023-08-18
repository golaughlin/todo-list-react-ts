import { useState, useEffect } from 'react';
import React = require('react');
import './style.css';

interface Todo {
  id: number;
  text: string;
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (todoText.trim() === '') return;

    const newTodo: Todo = { id: Date.now(), text: todoText };
    setTodos([...todos, newTodo]);
    setTodoText('');
  }

  function removeTodo(todo: Todo) {
    const filteredTodos = todos.filter((t: Todo) => t.id !== todo.id);
    setTodos([...filteredTodos]);
  }

  const listItems = todos.map((todo: Todo) => (
    <li key={todo.id}>
      {todo.text}&nbsp;
      <button onClick={() => removeTodo(todo)}>❌</button>
    </li>
  ));

  return (
    <div>
      <h1>Todo List</h1>
      {todos.length < 1 ? (
        <div>
          <h2>There are no todos on the list.</h2>
          <p>Please add a new todo to the list.</p>
        </div>
      ) : (
        <ul>{listItems}</ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="What do you need to do?"
        />
        <button type="submit">Add todo</button>
      </form>
    </div>
  );
}
