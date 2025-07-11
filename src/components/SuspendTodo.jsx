import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";

const SuspendTodo = ({ suspendTasks, onRemove, onStart }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center text-white">Suspended Tasks</h2>
            <div className="space-y-4 pr-2">
                {suspendTasks.length === 0 ? (
                    <p className="text-sm text-center text-gray-300">No suspended tasks...</p>
                ) : (
                    suspendTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between bg-yellow-800 px-4 py-2 rounded shadow-md"
                        >
                            <span className="truncate max-w-[150px] text-white">{task.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => onRemove(task.id)} title="Remove">
                                    <AiFillDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onStart(task.id)} title="Start">
                                    <MdPlayArrow className="text-blue-400 text-xl hover:scale-110 transition" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SuspendTodo;
