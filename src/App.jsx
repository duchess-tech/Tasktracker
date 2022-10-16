import React, { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import { TiEdit } from "react-icons/ti"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuid } from "uuid";
import CompleteTodo from './components/completeTodo'
import StartTodo from './components/startTodo'
import SuspendTodo from './components/suspendTodo'

function App() {
  const [todo, settodo] = useState([])
  const [complete, setComplete] = useState([])
  const [suspend, setsuspend] = useState([])
  const [start, setStart] = useState([])
  const [editid, seteditid] = useState(0)
  const [input, setInput] = useState('')

  let mytodo;

  const change = (e) => {                                           //catch value from input
    e.preventDefault()
    setInput(e.target.value)
  }
  const edittodo = (id) => {
    const edit = todo.find((i) => i.id === id)
    setInput(edit.title)                                             //edit todo
    seteditid(id)
  }

  useEffect((mytodo) => {                                             //set todo to local storage
    async function myTodo() {
      localStorage.setItem('mytodo', JSON.stringify(todo))

    } myTodo()
  }, [todo])

  const removetodo = id => {
    const del = [...todo].filter(todos => todos.id !== id)      //remove from todo
    settodo(del)
    console.log(del)
  }




  const changestart = (id) => {
    const sort = todo.find((sr) => sr.id === id)                           //from todo to stsrt
    start.push(sort)
    const delsort = [...todo].filter(todos => todos.id !== id)
    settodo(delsort)
    console.log(start)

  }
  const changesuspend = (id) => {
    const sus = todo.find((sr) => sr.id === id)
    suspend.push(sus)                                                               //from todo to suspend
    const del = [...todo].filter(todos => todos.id !== id)
    settodo(del)
  }
  const Add = (e) => {
    e.preventDefault();
    console.log('why are you not working')

    if (editid) {                                                         //add todo 
      const edittodo = todo.find((i) => i.id === editid)
      const updatetodo = todo.map((t) => t.id === edittodo.id ? (
        t = { id: t.id, title: input })
        : { ...t }
      )
      settodo(updatetodo)
      seteditid(0)
      setInput('')
      return
    }

    if (input !== '') {
      settodo([...todo, { id: uuid(), title: input }])

      setInput('')
      console.log(todo)
    }
  };





  return (<>
    <div className='todo-div'>
      <input className="input-todo" type='text' value={input} onChange={change} placeholder='Add a todo'>

      </input>
      <button className="add-btn" onClick={Add}>{editid ? 'EDIT' : 'ADD'}</button>

    </div>
    <div className='main-container'>

      <div className='todo-container'>
        <h1 className="myanni todo-l">TASK</h1>

        {todo.map((todos, index) =>

        (<ul className='action-div'>
          <li key={todos.id}>{todos.title} </li>

          <div className="action">
            <AiFillDelete className="delete-icon" onClick={() => removetodo(todos.id)} />
            {<TiEdit className="edit-icon" onClick={() => edittodo(todos.id)} />}

            <button className="start" onClick={() => changestart(todos.id)}></button>
            <button className="suspend" onClick={() => changesuspend(todos.id)}></button>
          </div>

        </ul>)
        )}

      </div>
      <div>
        <StartTodo start={start} suspend={suspend} todo={todo} setStart={setStart} complete={complete} />
      </div>
      <div>
        <SuspendTodo start={start} suspend={suspend} setsuspend={setsuspend} complete={complete} />
      </div>
      <div>
        <CompleteTodo complete={complete} setComplete={setComplete} />

      </div>
    </div></>
  )
}
export default App
