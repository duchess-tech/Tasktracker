import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Navbar from './components/Navbar';
import TaskList from './components/TaskBoard';
import StartTodo from './components/StartTodo';
import SuspendTodo from './components/SuspendTodo';
import CompleteTodo from './components/CompleteTodo';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import axios from 'axios';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const [input, setInput] = useState('');
  const [editid, setEditid] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [startTasks, setStartTasks] = useState([]);
  const [suspendTasks, setSuspendTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [overlayStartedTask, setOverlayStartedTask] = useState(null);
  const [overlayTask, setOverlayTask] = useState(null);
  const [overlaySuspendedTask, setOverlaySuspendedTask] = useState(null);
  const [overlayCompletedTask, setOverlayCompletedTask] = useState(null);

  const [showTextarea, setShowTextarea] = useState(false);
  const [longInput, setLongInput] = useState('');
  const location = useLocation()

  const taskListRef = useRef(null);
  const startedRef = useRef(null);
  const suspendedRef = useRef(null);
  const completedRef = useRef(null);


  const scrollToWithOffset = (ref, offset = 80) => {
    if (ref?.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };


  const handleNavClick = (ref) => {
    const isLargeScreen = window.innerWidth >= 1024;
    if (!ref?.current) return;

    if (isLargeScreen) {
      ref.current.classList.add('animate-focus');
      setTimeout(() => {
        ref.current.classList.remove('animate-focus');
      }, 1000);
    } else {
      scrollToWithOffset(ref, 300); // 100px offset from top
    }
  };


  const change = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setInput(value);
    } else {
      setLongInput(value);
      setShowTextarea(true);
    }
  };

  const Add = () => {
    if (!input.trim()) return;

    const timeStamp = new Date().toISOString();

    if (editid) {
      const updated = tasks.map((task) =>
        task.id === editid ? { ...task, title: input } : task
      );
      setTasks(updated);
      setEditid(null);
    } else {
      setTasks([{ id: uuid(), title: input, createdAt: timeStamp }, ...tasks]);
    }
    setInput('');
  };
  const handleLongTaskAdd = () => {
    if (!longInput.trim()) return;
    const timeStamp = new Date().toISOString();

    if (editid) {
      // Editing existing task
      const updated = tasks.map((task) =>
        task.id === editid ? { ...task, title: longInput.slice(0, 100) } : task
      );
      setTasks(updated);
      setEditid(null);
    } else {
      // Adding new task
      setTasks([{ id: uuid(), title: longInput.slice(0, 100), createdAt: timeStamp }, ...tasks]);
    }

    setInput('');
    setLongInput('');
    setShowTextarea(false);
  };


  const editTask = (id) => {
    const found = tasks.find((task) => task.id === id);
    if (!found) return;

    if (found.title.length > 15) {
      setLongInput(found.title);
      setEditid(id); // set the id so we know it's an edit
      setShowTextarea(true);
    } else {
      setInput(found.title);
      setEditid(id);
    }
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };



  const handleSuspend = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setSuspendTasks([task, ...suspendTasks]);
      setTasks(tasks.filter((t) => t.id !== id))

    }
  };


  const saveToHistory = async (title, status) => {
    try {
      await axios.post("http://localhost:5000/history", { title, status });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };
  const handleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setCompleteTasks([task, ...completeTasks]);
      setTasks(tasks.filter((t) => t.id !== id));
      saveToHistory(task.title, "completed")
    }
  };
  const handleStart = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setStartTasks([task, ...startTasks]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };
  const removeStartedTask = (id) => {
    setStartTasks(startTasks.filter((t) => t.id !== id));
  };

  const removeSuspendedTask = (id) => {
    setSuspendTasks(suspendTasks.filter((t) => t.id !== id));
  };

  const removeCompletedTask = (id) => {
    setCompleteTasks(completeTasks.filter((t) => t.id !== id));
  };

  const moveFromStartToSuspend = (id) => {
    const task = startTasks.find((t) => t.id === id);
    if (task) {
      setSuspendTasks([task, ...suspendTasks]);
      setStartTasks(startTasks.filter((t) => t.id !== id));
    }
  };

  const moveFromStartToComplete = (id) => {
    const task = startTasks.find((t) => t.id === id);
    if (task) {
      setCompleteTasks([task, ...completeTasks]);
      setStartTasks(startTasks.filter((t) => t.id !== id));
      saveToHistory(task.title, "completed")

    }
  };

  const moveFromSuspendToStart = (id) => {
    const task = suspendTasks.find((t) => t.id === id);
    if (task) {
      setStartTasks([task, ...startTasks]);
      setSuspendTasks(suspendTasks.filter((t) => t.id !== id));
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-900 to-indigo-900">
      <Navbar
        input={input}
        change={change}
        Add={Add}
        editid={editid}
        showTextarea={showTextarea}
        setShowTextarea={setShowTextarea}
        longInput={longInput}
        setLongInput={setLongInput}
        handleLongTaskAdd={handleLongTaskAdd}
        onScrollTo={{
          taskList: () => handleNavClick(taskListRef),
          started: () => handleNavClick(startedRef),
          suspended: () => handleNavClick(suspendedRef),
          completed: () => handleNavClick(completedRef)
        }}
      />


      <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="relative focus-target" ref={taskListRef} >
          <h2 className="text-xl font-bold mb-4 text-center text-white">Task List</h2>

          {/* Overlay showing full task info */}
          {overlayTask && (
            <div className="absolute inset-0 z-10 bg-black bg-opacity-80 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <p className="text-white mb-2 break-words whitespace-pre-wrap max-w-full"><strong>Task:</strong> {overlayTask.title}</p>
                <p className="text-white text-[8px] italic">
                  <strong>Created:</strong> {new Date(overlayTask.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setOverlayTask(null)}
                className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white self-end"
              >
                Close
              </button>
            </div>
          )}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-hidden  custom-scroll">

            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onEdit={editTask}
              onStart={handleStart}
              onSuspend={handleSuspend}
              onComplete={handleComplete}
              onShowOverlay={(task) => setOverlayTask(task)}
            />
          </div>
        </div>


        <div className='focus-target' ref={startedRef}>
          <h2 className="text-xl font-bold mb-4 text-center text-white">Started Tasks</h2>

          <div className="relative bg-blue-900 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-auto custom-scroll">
            {/* Overlay like TaskList */}
            {overlayStartedTask && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 p-3 rounded-lg flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Started Task Info</h3>
                  <p className="text-white mb-2 break-words whitespace-pre-wrap max-w-full">
                    <strong>Task:</strong> {overlayStartedTask.title}
                  </p>
                  <p className="text-white text-[10px] italic">
                    <strong>Started:</strong> {new Date(overlayStartedTask.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setOverlayStartedTask(null)}
                  className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white self-end"
                >
                  Close
                </button>
              </div>
            )}

            <StartTodo
              startTasks={startTasks}
              onRemove={removeStartedTask}
              onSuspend={moveFromStartToSuspend}
              onComplete={moveFromStartToComplete}
              onShowOverlay={(task) => setOverlayStartedTask(task)}
            />
          </div>
        </div>
        <div className='focus-target' ref={suspendedRef}>
          <h2 className="text-xl font-bold mb-4 text-center text-white">Suspended Tasks</h2>

          <div className="relative bg-yellow-900 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-auto custom-scroll">
            {/* Overlay like TaskList */}
            {overlaySuspendedTask && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 p-3 rounded-lg flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Suspended Task Info</h3>
                  <p className="text-white mb-2 break-words whitespace-pre-wrap max-w-full">
                    <strong>Title:</strong> {overlaySuspendedTask.title}
                  </p>
                  <p className="text-white text-[10px] italic">
                    <strong>Suspended:</strong> {new Date(overlaySuspendedTask.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setOverlaySuspendedTask(null)}
                  className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white self-end"
                >
                  Close
                </button>
              </div>
            )}

            <SuspendTodo
              suspendTasks={suspendTasks}
              onRemove={removeSuspendedTask}
              onStart={moveFromSuspendToStart}
              onShowOverlay={(task) => setOverlaySuspendedTask(task)}
            />
          </div>
        </div>


        <div className="md:col-span-2 lg:col-span-3 focus-target" ref={completedRef} >
          <h2 className="text-xl font-bold mb-4 text-center text-white">Completed Tasks</h2>

          <div className="relative bg-green-900 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-auto custom-scroll max-w-4xl mx-auto">
            {overlayCompletedTask && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 p-3 rounded-lg flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Completed Task Info</h3>
                  <p className="text-white mb-2 break-words whitespace-pre-wrap max-w-full">
                    <strong>Title:</strong> {overlayCompletedTask.title}
                  </p>
                  <p className="text-white text-[10px] italic">
                    <strong>Completed:</strong> {new Date(overlayCompletedTask.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setOverlayCompletedTask(null)}
                  className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white self-end"
                >
                  Close
                </button>
              </div>
            )}

            <CompleteTodo
              completeTasks={completeTasks}
              onRemove={removeCompletedTask}
              onShowOverlay={(task) => setOverlayCompletedTask(task)}
            />
          </div>
        </div>

      </main>


    </div>


  );
}

export default App;

















// A toast on successful task add

// Animations for overlay

// Persisting tasks to localStorage

// Export/import task list

// User login to store user tasks separately

