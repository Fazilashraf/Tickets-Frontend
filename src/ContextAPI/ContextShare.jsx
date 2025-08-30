import React, { createContext, useEffect, useState } from 'react'


export const headerContextResponse = createContext()

function ContextShare({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
    const [username, setUsername] = useState(sessionStorage.getItem("username") || "");

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("username");
        setIsLoggedIn(!!storedToken);
        setUsername(storedUser);
    }, []);

    const login = (user, token) => {
        sessionStorage.setItem("username", user);
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(user);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    return (
        <div>
            <headerContextResponse.Provider value={{ isLoggedIn, username, login, logout }}>
                {children}
            </headerContextResponse.Provider>
        </div>
    )
}

export default ContextShare