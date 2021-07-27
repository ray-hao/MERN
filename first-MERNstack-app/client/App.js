import {useState, useEffect} from 'react';
import {Modal, ModalBody} from 'react-bootstrap';

const API_BASE = "http://localhost:8080"

function App() {

  const [todos, settodos] = useState([]);
  const [popupActive, setpopupActive] = useState(false);
  const [newTodo, setnewTodo] = useState('');

  useEffect(() => {
    GetTodos();
    console.log(todos)
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + '/todos')
      .then(res => res.json())
      .then(data => settodos(data))
      .catch(err => console.error("Error:", err))
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + '/todos/complete/' + id, {
      method: "PUT"
    })
      .then(res => res.json())

    settodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    }))
  }

  const deleteTodo = async id => {
    const data  = await fetch(API_BASE + '/todos/delete/' + id, {
      method: "DELETE"
    })
      .then(res => res.json())

    settodos(todos => todos.filter(todo => todo._id !== data._id))
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + '/todos/new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    settodos([...todos, data]);
    setpopupActive(false);
    setnewTodo("");
  }

  const hideModal = () => setpopupActive(false);
  const showModal = () => setpopupActive(true);

  return (
    <div className='App'>
        <h1>Welcome, Ray</h1>
        <h4>Here are your tasks for today</h4>


        <div className='todos'>

          {todos.map(todo => (

          <div className={todo.complete ? 'todo is-complete' : 'todo'} key={todo._id} onClick={() => completeTodo(todo._id)}>

            <div className='checkbox'></div>

            <div className='text'>{todo.text}</div>

            <div className='delete-todo' onClick={() => deleteTodo(todo._id)}>x</div> 

          </div>

          ))}
        
          <div className="addPopup" onClick={showModal}>+</div>

        </div>
        
        {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setpopupActive(false)}>
              x
            </div>

            <div className="content">
              <h3>Add Task</h3>
              <input type="text" className="add-todo-input" onChange={e => setnewTodo(e.target.value)} value={newTodo}></input>
              <button className="button" onClick={() => addTodo()}>Create Task</button>
            </div>
          </div>
        ) : ''}

    </div>
  );
}

export default App;
