import React, { useState, useEffect } from "react";
import { UserButton, useUser } from '@clerk/clerk-react'

const Header = () => {
    const {user} = useUser();

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <header className="header">
            <h1>Hi {user?.firstName}! Here are your expenses</h1>
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️" : "🌙"}
            </button>
            <UserButton/>
        </header>
    );
};

export default Header;
