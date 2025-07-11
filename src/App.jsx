// App.jsx
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Navbar from './components/Navbar';
import TaskList from './components/TaskBoard';
import StartTodo from './components/StartTodo';
import SuspendTodo from './components/SuspendTodo';
import CompleteTodo from './components/CompleteTodo';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [input, setInput] = useState('');
  const [editid, setEditid] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [startTasks, setStartTasks] = useState([]);
  const [suspendTasks, setSuspendTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);

  const change = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setInput(value);
    }
  };

  const Add = () => {
    if (!input.trim()) return;

    if (editid) {
      const updated = tasks.map((task) =>
        task.id === editid ? { ...task, title: input } : task
      );
      setTasks(updated);
      setEditid(null);
    } else {
      setTasks([...tasks, { id: uuid(), title: input }]);
    }
    setInput('');
  };

  const editTask = (id) => {
    const found = tasks.find((task) => task.id === id);
    setInput(found.title);
    setEditid(id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStart = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setStartTasks([...startTasks, task]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleSuspend = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setSuspendTasks([...suspendTasks, task]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setCompleteTasks([...completeTasks, task]);
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
      setSuspendTasks([...suspendTasks, task]);
      setStartTasks(startTasks.filter((t) => t.id !== id));
    }
  };

  const moveFromStartToComplete = (id) => {
    const task = startTasks.find((t) => t.id === id);
    if (task) {
      setCompleteTasks([...completeTasks, task]);
      setStartTasks(startTasks.filter((t) => t.id !== id));
    }
  };

  const moveFromSuspendToStart = (id) => {
    const task = suspendTasks.find((t) => t.id === id);
    if (task) {
      setStartTasks([...startTasks, task]);
      setSuspendTasks(suspendTasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-slate-900 to-indigo-900 text-white">
      <Navbar input={input} change={change} Add={Add} editid={editid} />
      <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-blue ">
        <motion.div layout className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden">
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onEdit={editTask}
            onStart={handleStart}
            onSuspend={handleSuspend}
            onComplete={handleComplete}
          />
        </motion.div>

        <motion.div layout className="bg-blue-900 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-auto">
          <StartTodo
            startTasks={startTasks}
            onRemove={removeStartedTask}
            onSuspend={moveFromStartToSuspend}
            onComplete={moveFromStartToComplete}
          />
        </motion.div>

        <motion.div layout className="bg-yellow-900 p-6 rounded-lg shadow-lg h-[60vh] overflow-y-auto">
          <SuspendTodo
            suspendTasks={suspendTasks}
            onRemove={removeSuspendedTask}
            onStart={moveFromSuspendToStart}
          />
        </motion.div>

        <motion.div layout className="bg-green-900 p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-3 h-[60vh] overflow-y-auto">
          <CompleteTodo
            completeTasks={completeTasks}
            onRemove={removeCompletedTask}
          />
        </motion.div>
      </main>
    </div>
  );
}

export default App;
