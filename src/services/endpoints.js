const URL_BASE = "https://mini-back-findy-dl2h.onrender.com/";

const endpoints = {
    userByEmailAndPass:(userName, password) => `${URL_BASE}usuarios?usuario=${userName}&contraseña=${password}`
}

export default endpoints;