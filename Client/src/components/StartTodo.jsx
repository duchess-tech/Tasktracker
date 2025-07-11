import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdPause, MdDone, MdVisibility } from "react-icons/md";
const StartTodo = ({ startTasks, onRemove, onSuspend, onComplete, onShowOverlay }) => {
    return (
        <div className="space-y-4 pr-2">
            {startTasks.length === 0 ? (
                <p className="text-sm text-center text-gray-300">No tasks started...</p>
            ) : (
                startTasks.map((task, index) => (
                    <div
                        key={task.id}
                        className="bg-gradient-to-r from-blue-800 to-blue-600 px-4 py-3 rounded-lg shadow-md animate-fade-in"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-sm truncate max-w-[150px]">
                                {index + 1}. {task.title}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => onRemove(task.id)} title="Remove">
                                    <AiFillDelete className="text-red-500 text-xl hover:text-red-400 hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onSuspend(task.id)} title="Suspend">
                                    <MdPause className="text-yellow-300 text-xl hover:text-yellow-200 hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onComplete(task.id)} title="Complete">
                                    <MdDone className="text-green-400 text-xl hover:text-green-300 hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onShowOverlay(task)} title="View">
                                    <MdVisibility className="text-white text-xl hover:text-blue-200 hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-300 text-xs italic mt-1 text-center">
                            {task.createdAt ? `Started: ${new Date(task.createdAt).toLocaleString()}` : "No timestamp"}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StartTodo;
