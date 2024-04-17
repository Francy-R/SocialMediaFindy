import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";

export const AppContext = createContext(null);

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element ={<Home />} />
                <Route path="login" element={<Login setUser={setUser} />} />
                <Route path="register" element = {<Register />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter;