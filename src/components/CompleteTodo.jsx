import React from "react";
import { AiFillDelete } from "react-icons/ai";

const CompleteTodo = ({ completeTasks, onRemove }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center text-white">Completed Tasks</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {completeTasks.length === 0 ? (
                    <p className="text-sm text-center text-gray-300">No completed tasks...</p>
                ) : (
                    completeTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between bg-green-800 px-4 py-2 rounded shadow-md"
                        >
                            <span className="truncate max-w-[150px] text-white">{task.title}</span>
                            <button onClick={() => onRemove(task.id)} title="Remove">
                                <AiFillDelete className="text-red-400 text-xl hover:scale-110 transition" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CompleteTodo;
