import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, MoreVertical, Sun, Moon, ListTodo, LogOut, User } from 'lucide-react';
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate, useLocation } from "react-router";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("/");
    const { isDarkMode, toggleDarkMode, user } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logged Out!",
                    text: `${user.displayName} has been Logged Out.`,
                    icon: "success"
                });
                signOut(auth)
                localStorage.removeItem("user")
                navigate("/getstarted")
            }
        });
    }

    const categories = [
        { id: "/", label: "Dashboard", icon: ListTodo },
    ];

    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        closed: {
            x: "-100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                !event.target.closest(".sidebar") &&
                !event.target.closest(".menu-trigger") &&
                window.innerWidth < 768
            ) {
                setIsOpen(false);
            }
            if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, isProfileOpen]);

    useEffect(() => {
        setActiveCategory(location.pathname);
    }, [location]);

    useEffect(() => {
        setIsProfileOpen(false)
        if (window.innerWidth < 768) {
            setIsOpen(false)
        }
    }, [activeCategory])

    if (!user) {
        return (
            <div className="fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-[#0F1729] shadow-lg animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="px-4 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 md:hidden"
                    />
                )}
            </AnimatePresence>
            <button
                className="menu-trigger fixed top-4 left-4 z-40 md:hidden bg-white dark:bg-[#0F1729] p-2 rounded-lg shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu size={24} className="text-gray-700 dark:text-gray-200" />
            </button>
            <motion.aside
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`
                    sidebar fixed left-0 top-0 h-screen w-[280px]
                    bg-white dark:bg-[#0F1729]
                    z-50 flex flex-col
                    transition-colors duration-200 ease-in-out
                    md:translate-x-0
                    shadow-lg
                `}
            >
                <div className="relative flex items-center p-4 border-b dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                <img src={user.photoURL || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0F1729] rounded-full flex items-center justify-center">
                                <Moon size={12} className="text-gray-300" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{user.displayName}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <MoreVertical size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="profile-dropdown absolute z-50 top-16 right-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700"
                            >
                                <NavLink to="/profile" className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                                    <span className="text-gray-700 dark:text-gray-200">Profile</span>
                                </NavLink>
                                <button onClick={handleLogout} className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                                    <LogOut size={16} className="text-red-500" />
                                    <span className="text-red-500">Logout</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex-1 py-4 overflow-y-auto">
                    <div className="space-y-1 px-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <NavLink
                                    key={category.id}
                                    to={category.id}
                                    className={`
                                        w-full flex items-center px-3 py-2 rounded-lg
                                        transition-all duration-200 group
                                        ${activeCategory === category.id
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }
                                    `}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    <span className="ml-3 flex-1">{category.label}</span>
                                    <ChevronRight
                                        size={16}
                                        className={`
                                            transition-transform duration-200
                                            ${activeCategory === category.id ? "rotate-90" : ""}
                                        `}
                                    />
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 border-t dark:border-gray-800">
                    <motion.div
                        className="w-full h-12 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1.5 cursor-pointer"
                        onClick={toggleDarkMode}
                    >
                        <motion.div className="relative w-full h-full flex items-center" initial={false}>
                            <motion.div
                                className="absolute w-[50%] h-full bg-white dark:bg-gray-700 rounded-md shadow-sm"
                                animate={{ x: isDarkMode ? "100%" : "0%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <div className="flex items-center justify-around w-full relative z-10">
                                <div className={`flex items-center space-x-2 ${!isDarkMode ? "text-gray-900" : "text-gray-400"}`}>
                                    <Sun size={16} />
                                    <span className="text-sm font-medium">Light</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-400"}`}>
                                    <Moon size={16} />
                                    <span className="text-sm font-medium">Dark</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;