import React, { useReducer, useState } from "react";
import "./Todo.css";
let initial = { todos: [], todocount: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
      };
    case "toggle":
      return {
        todos: state.todos.map((e, id) =>
          id === action.id ? { ...e, completed: !e.completed } : e
        ),
      };
    case "delete":
      return {
        todos: state.todos.filter((e, id) => id !== action.id),
      };
    default:
      return state;
  }
};

const Todo = () => {
  const [{ todos, todocount }, dispatch] = useReducer(reducer, initial);

  const [text, setText] = useState();

  const handelsubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add", text });
    setText("");
  };
  const handelUpdate = (id) => {
    dispatch({ type: "toggle", id });
  };

  const handeldelete = (id) => {
    dispatch({ type: "delete", id });
  };
  return (
    <div className="box">
      <form onSubmit={handelsubmit}>
        <input
          type="text"
          placeholder="Enter your todo here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      {todos.map((e, id) => (
        <div
          key={e.id}
          style={{ textDecoration: e.completed ? "line-through" : "" }}
        >
          <li>{e.text}</li>
          <button onClick={() => handeldelete(id)}>Delete</button>
          <button onClick={() => handelUpdate(id)}>
            {e.completed ? "true" : "false"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
