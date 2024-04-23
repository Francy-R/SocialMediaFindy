import { useEffect, useReducer, useState } from "react";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import "../pages/home/home.scss";
import { TbMessageCircle2 } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { getAllPots, getAllUsers } from "../services/userServices";



const ActionTypes = {
  SET_POSTS: "SET_POSTS",
  SET_USERS: "SET_USERS"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return { ...state, posts: action.payload };
    case ActionTypes.SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  users: []
};

export default function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const postsData = await getAllPots();
      const usersData = await getAllUsers();
      dispatch({ type: ActionTypes.SET_POSTS, payload: postsData });
      dispatch({ type: ActionTypes.SET_USERS, payload: usersData });
      setUsersLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Verificamos si los usuarios se han cargado y las publicaciones han cambiado
    if (usersLoaded && state.posts.length > 0 && state.users.length > 0) {
      const postsWithUserNames = state.posts.map((post) => {
        const user = state.users.find((user) => user.id === post.idUsuario);
        if (user) {
          return {
            ...post,
            userName: user.nombre,
            userPhoto: user.urlPerfil
          };
        }
        return post;
      });
      // Verificamos si el estado ya ha sido actualizado con los nombres de usuario y las URL de las fotos de perfil
      if (!state.posts.every((post, index) => post.userName === postsWithUserNames[index].userName && post.userPhoto === postsWithUserNames[index].userPhoto)) {
        dispatch({ type: ActionTypes.SET_POSTS, payload: postsWithUserNames });
      }
    }
  }, [state.posts, state.users, usersLoaded]);

  return (
    <div className="home__posts">
      {state.posts.map((post) => (
        <div key={post.id}>
          <div className="home__posts-header">
            <div className="home__posts-header-user">
              <img src={post.userPhoto} alt={post.userName} className="home__posts-header-user-img"/>
            </div>
            <b>{post.userName}</b>
          </div>
          <img src={post.recursos[0]} alt="post" />
          <div className="home__posts-icons">
            <div>
              <FaRegHeart />
              <p>2</p>
            </div>
            <div>
              <TbMessageCircle2 />
              <p>2</p>
            </div>
            <div>
              <FiSend />
              <p></p>
            </div>
            <FaRegBookmark />
          </div>
          <div className="home__posts-footer">
            <p>
              <b>{post.userName}</b> {post.descripcion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}