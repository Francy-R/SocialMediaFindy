import { createContext, useState} from "react";
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
        <AppContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="home" element={<Home/>} />
                    <Route path="perfil/:id" element={<Friend />} />
                </Routes>

            </BrowserRouter>
        </AppContext.Provider>

    )
}

export default AppRouter;
