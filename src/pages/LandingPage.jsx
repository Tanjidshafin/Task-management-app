import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight, Moon, Sun } from 'lucide-react';
import { AppContext } from "../context/AppContext";


const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useContext(AppContext);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="bg-gradient-to-br min-h-screen from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300">
            <nav className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                TaskMaster
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                {["Features", "Solutions", "Resources", "Pricing"].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    Get Started
                                </button>
                                <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
                            {["Features", "Solutions", "Resources", "Pricing"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                >
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-indigo-600 dark:text-indigo-400 font-medium"
                            >
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>

            <motion.div
                initial="initial"
                animate="animate"
                variants={stagger}
                className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <motion.div
                            variants={fadeInUp}
                            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                        >
                            <h1>
                                <span className="block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                                    <span className="block text-gray-900 dark:text-white">Revolutionize Your</span>
                                    <span className="block text-indigo-600 dark:text-indigo-400 mt-1">Task Management</span>
                                </span>
                            </h1>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                            >
                                Seamlessly organize your life and boost productivity with TaskMaster. Experience the power of
                                intelligent task management, team collaboration, and AI-driven insights.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    Start Your Journey <ChevronRight className="ml-2" size={20} />
                                </button>
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    Join over 1 million users transforming their productivity
                                </p>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                        >
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <div className="relative block w-full bg-white dark:bg-gray-800 overflow-hidden rounded-lg transform transition-all hover:scale-105 duration-300">
                                    <img src="https://ouch-cdn2.icons8.com/hCslXW3zoGo4eh0xl_HlSU6m6RTERHgkRGF4O8-vsUQ/rs:fit:622:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjg3/LzA4OTMwMGE2LTY0/NTktNDhmZS1hZjRl/LWNkNjFiMzhmOWJh/MS5zdmc.png" alt="TaskMaster app interface" className="w-full" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 mix-blend-multiply opacity-20"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            {isModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <button
                                className="absolute cursor-pointer top-2 right-4 text-red-700 hover:text-red-600 dark:text-red-300 dark:hover:text-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>

                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Get Started with TaskMaster
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Sign in with Google to access your account or create a new one.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default LandingPage;