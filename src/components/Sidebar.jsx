"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Menu,
    X,
    ChevronRight,
    MoreVertical,
    Sun,
    Moon,
    CheckSquare,
    Clock,
    ListTodo,
    LogOut,
    User,
} from "lucide-react"
import { useNavigate } from "react-router"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [isDark, setIsDark] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState("/")
    const navigate = useNavigate()
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
            setIsDark(true)
            document.documentElement.setAttribute("data-theme", "dark")
            document.documentElement.classList.add("dark")
        }
    }, [])
    const toggleTheme = () => {
        setIsDark(!isDark)
        if (!isDark) {
            document.documentElement.setAttribute("data-theme", "dark")
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }
    const categories = [
        { id: "/", label: "Dashboard", icon: ListTodo },
    ]
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
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                !event.target.closest(".sidebar") &&
                !event.target.closest(".menu-trigger") &&
                window.innerWidth < 768
            ) {
                setIsOpen(false)
            }
            if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, isProfileOpen])

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
                                <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0F1729] rounded-full flex items-center justify-center">
                                <Moon size={12} className="text-gray-300" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Project Manager</p>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <MoreVertical size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X size={20} className="text-gray-500 dark:text-gray-400" />
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
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                                    <span className="text-gray-700 dark:text-gray-200">Profile</span>
                                </button>
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
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
                            const Icon = category.icon
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id)
                                        navigate(category.id)
                                    }}
                                    className={`
                    w-full flex items-center px-3 py-2 rounded-lg
                    transition-all duration-200 group
                    ${activeCategory === category.id
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }
                  `}
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
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="p-4 border-t dark:border-gray-800">
                    <motion.div
                        className="w-full h-12 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1.5 cursor-pointer"
                        onClick={toggleTheme}
                    >
                        <motion.div className="relative w-full h-full flex items-center" initial={false}>
                            <motion.div
                                className="absolute w-[50%] h-full bg-white dark:bg-gray-700 rounded-md shadow-sm"
                                animate={{ x: isDark ? "100%" : "0%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <div className="flex items-center justify-around w-full relative z-10">
                                <div className={`flex items-center space-x-2 ${!isDark ? "text-gray-900" : "text-gray-400"}`}>
                                    <Sun size={16} />
                                    <span className="text-sm font-medium">Light</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${isDark ? "text-white" : "text-gray-400"}`}>
                                    <Moon size={16} />
                                    <span className="text-sm font-medium">Dark</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.aside>
        </>
    )
}

export default Sidebar

