import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdPlayArrow, MdVisibility } from "react-icons/md";

const SuspendTodo = ({ suspendTasks, onRemove, onStart, onShowOverlay }) => {
    return (
        <div className="space-y-4 pr-2">
            {suspendTasks.length === 0 ? (
                <p className="text-sm text-center text-gray-300">No suspended tasks...</p>
            ) : (
                suspendTasks.map((task, index) => (
                    <div
                        key={task.id}
                        className="bg-gradient-to-r from-yellow-800 to-yellow-600 px-4 py-3 rounded-lg shadow-md animate-fade-in"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-sm truncate max-w-[150px]">
                                {index + 1}. {task.title}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => onRemove(task.id)} title="Remove">
                                    <AiFillDelete className="text-red-400 hover:text-red-300 text-xl hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onStart(task.id)} title="Start">
                                    <MdPlayArrow className="text-blue-400 hover:text-blue-300 text-xl hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onShowOverlay(task)} title="View">
                                    <MdVisibility className="text-white text-xl hover:text-yellow-200 hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-300 text-xs italic mt-1 text-center">
                            {task.createdAt ? `Suspended: ${new Date(task.createdAt).toLocaleString()}` : "No timestamp"}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SuspendTodo;
