const URL_BASE = "https://mini-back-findy-dl2h.onrender.com/";

const endpoints = {
    userByEmailAndPass:(userName, password) => `${URL_BASE}usuarios?usuario=${userName}&contraseña=${password}`,
    getAllUsers: `${URL_BASE}usuarios`,
    getUser: (idUser) => `${URL_BASE}usuarios?id=${idUser}`,
    getAllPosts: `${URL_BASE}publicaciones`,
    getCommentsByPostId : (idPost)=> `${URL_BASE}comentarios?idPublicacion=${idPost}`
}

export default endpoints;