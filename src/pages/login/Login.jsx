import { useContext } from "react";
import "../login/login.scss"
import useForm from "../../hooks/useForm";
import { getUserByEmailAndPassword } from "../../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../router/AppRouter";
import '../login/login.scss';

const StyledForm = styled.form`
    display: flex;
    flex-direction:column;
    width:60%;
    gap:15px;
    div{
        display:flex;
        flex-direction:column;
    }
`
const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    height: 80vh;
 `
const INITIALVALUE = {
    userName: '',
    password: ''
}

const Login = () => {
    const navigate = useNavigate()
    const [form, handleChange, reset] = useForm(INITIALVALUE)
    const { setUser } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(form);
        const user = await getUserByEmailAndPassword(form);
        console.log("este es el user de login" + getUserByEmailAndPassword(form.userName));
        reset();
        if (user) {
            setUser(user)
            alert(`Bienvenid@ ${form.userName}`)
            navigate('/home') // recodar enlazar con home
        } else {
            alert("Verifique sus credenciales")
        }

    }

    return (
        <>
            <main className="loginContenido">
                <StyledLogin>
                    <img src="/src/assets/LOGO arriba.png" className="imageLogo" />
                    <img src="/src/assets/LOGO abajo.png" className="imageLogo" />
                    <h1>Inicio de sesión</h1>
                    <StyledForm onSubmit={handleSubmit}>
                        <div className="cajitalogin">
                            <div >
                                <label>Nombre de usuario</label>
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="Usuario"
                                    value={form.userName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="botonEnviar" type="submit">Enviar</button>
                        </div>

                    </StyledForm>
                    <p>¿Aún no tienes una cuenta? {" "}
                        <Link to={"/register"}>Regístrate ahora </Link>
                    </p>
                </StyledLogin>

            </main>
        </>
    )
};

export default Login;