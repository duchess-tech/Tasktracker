import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { MdPlayArrow, MdPause, MdDone, MdOutlineLayers } from "react-icons/md";

const TaskList = ({ tasks, onDelete, onEdit, onStart, onSuspend, onComplete, onShowOverlay }) => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="overflow-y-auto max-h-[60vh] pr-2 space-y-4 custom-scroll pb-24">
            {sortedTasks.length === 0 ? (
                <p className="text-sm text-center text-gray-400">No tasks yet...</p>
            ) : (
                sortedTasks.map((task, index) => (
                    <div
                        key={task.id}
                        className="bg-gradient-to-r from-indigo-800 to-blue-800 px-4 py-3 rounded-lg shadow-lg"
                    >
                        <div className="flex items-center justify-between ">
                            <span className="text-white text-sm font-semibold truncate max-w-[150px]">
                                {index + 1}. {task.title}
                            </span>
                            <div className="flex ">
                                <button onClick={() => onDelete(task.id)} title="Delete">
                                    <AiFillDelete className="text-red-500 text-xl hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onEdit(task.id)} title="Edit">
                                    <TiEdit className="text-yellow-500 text-xl hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onStart(task.id)} title="Start">
                                    <MdPlayArrow className="text-green-500 text-xl hover:scale-110 transition-transform" />
                                </button>
                                <button onClick={() => onSuspend(task.id)} title="Suspend">
                                    <MdPause className="text-orange-500 text-xl hover:scale-110 transition-transform" />
                                </button>
                                {/* <button onClick={() => onComplete(task.id)} title="Complete">
                                    <MdDone className="text-blue-500 text-xl hover:scale-110 transition-transform" />
                                </button> */}
                                <button onClick={() => onShowOverlay(task)} title="View Task">
                                    <MdOutlineLayers className="text-teal-400 text-xl hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-300 text-xs italic mt-2 text-center w-full">
                            Created at: {new Date(task.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
