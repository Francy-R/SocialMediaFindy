import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Home from "../pages/home/Home";
import { AppContextProvider } from "../context/AppContext"
import Friend from "../pages/friend/Friend";

export const AppContext = createContext(null);

const AppRouter = () => {
    const [user, setUser] = useState({})

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Login setUser={setUser} />} />
                    <Route path="register" element={<Register />} />
                    <Route path="home" element={<Home />} />
                    <Route path="perfil/:id" element={<Friend />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
