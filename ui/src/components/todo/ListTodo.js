import React from 'react';
import { Link } from 'react-router-dom'

const ListTodo = ({ todos, deleteTodo, updateStatusTodo}) => {

  const todoList = todos.length ? (
    todos.map((todo, idx) => {
      return (
        <li className="collection-item" key={ todo.id }>
          <div>
            <label>
              <input id="indeterminate-checkbox" name="isDone" type="checkbox" checked={todo.is_done} onChange={() => { updateStatusTodo(todo.id) }} />
              <span>{idx+1}.</span>
            </label>
            <span>{todo.is_done ? (<del>{todo.text}</del>) : (todo.text)}</span>
          </div>
          <hr></hr>
          <div id="todoDelete" onClick={() => { deleteTodo(todo.id) }}>Delete</div>
          <Link to={'/todos/' + todo.id}><div>Reminder</div></Link>
        </li>
      )
    })
  ) : (
    <p className="center">You have no todo's left.</p>
  )
  return (
    <ul className="collection">
      {todoList}
    </ul>
  );
}

export default ListTodo;