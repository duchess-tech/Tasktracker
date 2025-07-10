

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
  }




  const changestart = (id) => {
    const sort = todo.find((sr) => sr.id === id)                           //from todo to start
    start.push(sort)
    const delsort = [...todo].filter(todos => todos.id !== id)
    settodo(delsort)

  }
  const changesuspend = (id) => {
    const sus = todo.find((sr) => sr.id === id)
    suspend.push(sus)                                                               //from todo to suspend
    const del = [...todo].filter(todos => todos.id !== id)
    settodo(del)
  }
  const Add = (e) => {
    e.preventDefault();

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
    }
  };





  return (
    <div className=''>
      <div className='flex justify-center mt-9 mb-9'>
        <input className="lg:w-1/4 p-2 sm:w-1/2 border-2 rounded-xl mr-3" type='text' value={input} onChange={change} placeholder='Add a todo'>

        </input>
        <button className="w-56 rounded-xl sm:w-40 p-2 border-2 text-white text-sm" onClick={Add}>{editid ? 'Edit' : 'Add'}</button>
      </div>
      <div className='flex justify-around  md:justify-between sm:p-5 sm:flex-wrap  sm:justify-center'>

        <div className=' sm:mb-9'>
          <div className='w-96  border-2 border-ash text-center p-2'>
            <h1 className="myanni text-ash">TASK</h1>
          </div>

          {todo.map((todos, index) =>
          (
            <div className='w-96   border-r-2 border-ash text-lg p-2' key={index}>
              <ul className='flex  justify-between text-white list-none'>
                <li key={todos.id}>{todos.title} </li>

                <div className="flex">
                  <AiFillDelete className="del-btn text-red  cursor-pointer" onClick={() => removetodo(todos.id)} />
                  {<TiEdit className="edit-btn cursor-pointer" onClick={() => edittodo(todos.id)} />}

                  <button className="bg-blueop mr-2 rounded-full p-2" onClick={() => changestart(todos.id)}></button>
                  <button className="bg-blue p-2 rounded-full " onClick={() => changesuspend(todos.id)}></button>
                </div>

              </ul>
            </div>
          )
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
      </div> </div>
  )
}
export default App
