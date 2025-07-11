import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaHistory } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom'
function Navbar({
    input,
    change,
    Add,
    editid,
    showTextarea,
    setShowTextarea,
    longInput,
    setLongInput,
    handleLongTaskAdd,
    onScrollTo
}) {
    return (
        <motion.nav
            className="sticky top-0 z-50 bg-[#0a0f1c] text-white border-b border-[#1f2937] shadow-2xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col lg:flex-row justify-between items-center gap-4">
                {/* Logo */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-blue-400">TaskHub</h1>
                    <p className="text-sm text-gray-400 hidden lg:block">Stay organized, stay winning 🚀</p>
                </div>

                {/* Input and Button */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        Add();
                    }}
                    className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center items-center"
                >
                    <input
                        value={input}
                        onChange={change}
                        type="text"
                        placeholder="What's on your mind?"
                        className="px-4 py-2 w-full sm:w-72 bg-[#1e293b] text-white border border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 shadow"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition duration-300 ease-in-out"
                    >
                        <FaPlus />
                        {editid ? 'Edit' : 'Add'}
                    </button>
                </form>

                {/* Right Side Placeholder */}
                <div className="hidden lg:block text-sm text-gray-400 text-right">
                    ✅ Let’s get productive today
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="max-w-6xl mx-auto px-5 pb-4 flex flex-wrap gap-3 justify-center lg:justify-center">
                <button onClick={onScrollTo.taskList} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition">Task List</button>
                <button onClick={onScrollTo.started} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Started</button>
                <button onClick={onScrollTo.suspended} className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Suspended</button>
                <button onClick={onScrollTo.completed} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition">Completed</button>
                <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                    <FaHistory />
                    <Link to="/history" className="text-blue-400 hover:text-blue-300">History</Link>
                </button>
            </div>

            {/* ✅ Overlay for long input */}
            {showTextarea && (
                <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-[#1e293b] p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
                        <button
                            onClick={() => setShowTextarea(false)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-2xl"
                        >
                            <IoClose />
                        </button>
                        <h2 className="text-white text-lg font-semibold mb-3">Task is too long — continue here</h2>
                        <textarea
                            value={longInput}
                            onChange={(e) => {
                                if (e.target.value.length <= 300) setLongInput(e.target.value);
                            }}
                            placeholder="Write your full task here (max 300 characters)..."
                            className="w-full p-3 rounded bg-slate-800 text-white placeholder:text-gray-400 resize-none h-32"
                        />
                        <div className="text-sm text-gray-300 text-right mt-1">
                            {longInput.length}/300
                        </div>
                        <button
                            onClick={handleLongTaskAdd}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}

export default Navbar;
