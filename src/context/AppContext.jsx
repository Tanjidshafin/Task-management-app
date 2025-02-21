import React, { createContext, useState, useEffect, use } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useNavigate } from "react-router";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
        setLoading(false);
    }, []);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, []);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser))
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add("dark");
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            }
            return newMode;
        });
    };
    const handleGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user);
                navigate("/")
            })
            .finally(() => setLoading(false));
    };
    if (loading) { 
        return <div>loading....</div>
    }
    const value = {
        isDarkMode,
        toggleDarkMode,
        handleGoogle,
        user

    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;