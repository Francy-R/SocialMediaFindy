// Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";



const INITIALVALUE = {
    userName: '',
    password: ''
}
const Register = ({setUser}) => {

    const navigate = useNavigate()
    const [form, handleChange, reset] = useForm(INITIALVALUE)
  
};

export default Register;