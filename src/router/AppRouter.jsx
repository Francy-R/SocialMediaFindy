import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Index from "../pages";

export const AppContext = createContext(null);

const AppRouter = () => {
    const [user, setUser] = useState({})
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element ={<Index />} />
                <Route path="login" element={<Login setUser={setUser}/>} />
                <Route path="register" element = {<Register />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter;
