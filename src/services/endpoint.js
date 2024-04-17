const URL_BASE = "https://mini-back-findy-dl2h.onrender.com/";

const endpoint = {
  getAllUsers: `${URL_BASE}usuarios`,
  getUser: (idUser) => `${URL_BASE}usuarios?id=${idUser}`,
  getAllPosts: `${URL_BASE}publicaciones`

};

export default endpoint;