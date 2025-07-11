// components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

function Navbar({ input, change, Add, editid }) {
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

                {/* Right: Optional future menu */}
                <div className="hidden lg:block text-sm text-gray-400 text-right">
                    ✅ Let’s get productive today
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar;
