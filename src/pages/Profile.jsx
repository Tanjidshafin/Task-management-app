import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Edit3, Users, UserPlus } from 'lucide-react';
import { AppContext } from "../context/AppContext";


const Profile = () => {
    const { user } = useContext(AppContext);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "activities", label: "Activities" },
        { id: "projects", label: "Projects" },
        { id: "documents", label: "Documents" },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 p-4 md:p-8"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={itemVariants}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20220635-wFpUYGuLITHFPLmSAFrMj9InJRzIF1.png"}
                                alt={user?.displayName}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                        {user?.displayName}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Task Management Expert</p>

                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">California, United States</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Building2 className="w-4 h-4 mr-1" />
                                            <span className="text-sm">TaskMaster Inc</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-900 dark:text-white">24.3K</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-900 dark:text-white">1.3K</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t dark:border-gray-700">
                        <div className="flex gap-6 mt-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium pb-4 border-b-2 border-transparent hover:border-emerald-500 transition-all"
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Complete Your Profile
                        </h2>
                        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "30%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute h-full bg-emerald-500"
                            />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            30% Complete
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Full Name
                                    </label>
                                    <div className="text-gray-900 dark:text-white">
                                        {user?.displayName}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Email
                                    </label>
                                    <div className="text-gray-900 dark:text-white">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;