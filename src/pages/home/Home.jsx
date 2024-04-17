import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      hola
      <h1>Regístrate <Link to="/register">aquí</Link></h1>
      <h1>Ingresa <Link to="/login">aquí</Link></h1>
      
    </div>
  );
};

export default Home;