import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { MdPlayArrow, MdPause, MdDone } from "react-icons/md";

const TaskList = ({ tasks, onDelete, onEdit, onStart, onSuspend, onComplete }) => {
    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Task List</h2>
            <div className="space-y-4 pr-2 ">
                {tasks.length === 0 ? (
                    <p className="text-sm text-center text-gray-400">No tasks yet...</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between bg-slate-700 px-4 py-2 rounded shadow-md"
                        >
                            <span className="truncate max-w-[150px] text-white">{task.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => onDelete(task.id)} title="Delete">
                                    <AiFillDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onEdit(task.id)} title="Edit">
                                    <TiEdit className="text-yellow-400 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onStart(task.id)} title="Start">
                                    <MdPlayArrow className="text-blue-400 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onSuspend(task.id)} title="Suspend">
                                    <MdPause className="text-indigo-400 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onComplete(task.id)} title="Complete">
                                    <MdDone className="text-green-400 text-xl hover:scale-110 transition" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
