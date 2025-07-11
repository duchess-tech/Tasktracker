// components/PendingTodo.jsx
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { TiEdit } from 'react-icons/ti';
import { motion } from 'framer-motion';

function PendingTodo({ todo, removetodo, edittodo, changestart, changesuspend }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black rounded-xl shadow-md p-4"
        >
            <h2 className="text-lg font-bold text-gray-300 mb-4 text-center">📋 Pending</h2>

            {todo.length === 0 && (
                <p className="text-gray-400 text-sm text-center">No pending tasks</p>
            )}

            {todo.map((task) => (
                <div
                    key={task.id}
                    className="bg-slate-700 rounded-md p-3 mb-3 flex flex-col gap-3"
                >
                    <div className="text-white font-medium">{task.title}</div>
                    <div className="flex gap-2 justify-end">
                        <AiFillDelete
                            className="text-red-400 hover:text-red-600 cursor-pointer"
                            onClick={() => removetodo(task.id)}
                            title="Delete"
                        />
                        <TiEdit
                            className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                            onClick={() => edittodo(task.id)}
                            title="Edit"
                        />
                        <button
                            className="w-6 h-6 bg-blue-400 hover:bg-blue-500 rounded-full"
                            onClick={() => changestart(task.id)}
                            title="Start"
                        ></button>
                        <button
                            className="w-6 h-6 bg-blue-700 hover:bg-blue-800 rounded-full"
                            onClick={() => changesuspend(task.id)}
                            title="Suspend"
                        ></button>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

export default PendingTodo;
