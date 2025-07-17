import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const History = () => {
    const [history, setHistory] = useState([]);
    const [selected, setSelected] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/history')
            .then((res) => {
                setHistory(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching history:', err);
                setLoading(false);
            });
    }, []);

    const handleSelect = (id) => {
        const updated = new Set(selected);
        if (updated.has(id)) {
            updated.delete(id);
        } else {
            updated.add(id);
        }
        setSelected(updated);
    };

    const handleDeleteSelected = async () => {
        if (selected.size === 0) return;

        toast.custom((t) => (
            <div className="bg-slate-800 text-white p-4 rounded shadow-md flex flex-col gap-4 w-[280px]">
                <span>Delete {selected.size} selected history item(s)?</span>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id); // Dismiss confirmation toast

                            try {
                                await Promise.all(
                                    [...selected].map((id) =>
                                        axios.delete(`http://localhost:5000/history/${id}`)
                                    )
                                );
                                setHistory((prev) =>
                                    prev.filter((item) => !selected.has(item._id))
                                );
                                setSelected(new Set());

                                toast.success('Selected history deleted!', {
                                    duration: 1500,
                                });
                            } catch (error) {
                                console.error('Error deleting selected history:', error);
                                toast.error('Failed to delete selected history.', {
                                    duration: 2000,
                                });
                            }
                        }}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            id: 'confirm-selected-delete',
        });
    };



    const handleDeleteAll = async () => {
        toast.custom((t) => (
            <div className="bg-slate-800 text-white p-4 rounded shadow-md flex flex-col gap-4 w-[280px]">
                <span>Are you sure you want to delete all history?</span>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id); // Close the confirmation dialog
                            try {
                                await axios.delete('http://localhost:5000/history');
                                setHistory([]);
                                setSelected(new Set());
                                toast.success('All history deleted successfully!', {
                                    duration: 1000,
                                });
                            } catch (err) {
                                toast.error('Failed to delete history.', { duration: 2000 });
                            }
                        }}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            id: 'delete-confirmation',
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                ← Back to Main Page
            </button>

            <h1 className="text-2xl font-bold mb-4">Task Completion History</h1>

            {loading ? (
                <p>Loading...</p>
            ) : history.length === 0 ? (
                <p className="text-gray-400">No completed task history available.</p>
            ) : (
                <>
                    <div className="flex gap-4 mb-4">
                        {selected.size > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Delete Selected ({selected.size})
                            </button>
                        )}

                    </div>

                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                        {history.map((item, index) => (
                            <li
                                key={item._id}
                                className="bg-slate-800 p-4 rounded shadow flex justify-between items-center"
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={selected.has(item._id)}
                                        onChange={() => handleSelect(item._id)}
                                    />
                                    <div>
                                        <p className="font-semibold">{index + 1}. {item.title}</p>
                                        <p className="text-xs text-gray-400 italic">
                                            Completed: {new Date(item.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button
                onClick={handleDeleteAll}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
                Delete All History
            </button>
        </div>
    );
};

export default History;
