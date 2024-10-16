import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [mensaje, setMensaje] = useState("");

    const register = async (email, password, nombre, apellido) => {
        try {
            await axios.post("/api/user/register", {
                first_name: nombre,
                last_name: apellido,
                username: email,
                password: password
            });
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post("/api/user/login", {
                username: email,
                password: password
            });
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            return true;
        } catch (error) {
            setMensaje("Usuario o contraseña incorrectos");
            setTimeout(() => {
                setMensaje("");
            }, 2500);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Elimina el token de localStorage
    };

    const value = { token, mensaje, register, login, logout };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
