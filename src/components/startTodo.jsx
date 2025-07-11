import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdPause, MdDone } from "react-icons/md";

const StartTodo = ({ startTasks, onRemove, onSuspend, onComplete }) => {
    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Started Tasks</h2>
            <div className="space-y-4  pr-2">
                {startTasks.length === 0 ? (
                    <p className="text-sm text-center text-gray-300">No tasks started...</p>
                ) : (
                    startTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between bg-blue-800 px-4 py-2 rounded shadow-md"
                        >
                            <span className="truncate max-w-[150px] text-white">{task.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => onRemove(task.id)} title="Remove">
                                    <AiFillDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                </button>
                                <button onClick={() => onSuspend(task.id)} title="Suspend">
                                    <MdPause className="text-yellow-300 text-xl hover:scale-110 transition" />
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

export default StartTodo;
