import { Link } from "react-router-dom";


const Index = () => {
  return (
    <div>
      <h1>Regístrate <Link to="/register">aquí</Link></h1>
      <h1>Ingresa <Link to="/login">aquí</Link></h1>
      
    </div>
  );
};

export default Index;