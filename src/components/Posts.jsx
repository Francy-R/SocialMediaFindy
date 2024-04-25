import { useEffect, useState } from "react";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import "../pages/home/home.scss";
import { TbMessageCircle2 } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { getAllPosts, getAllUsers, getCommentsCountForPost } from "../services/userServices";
import { useAppContext } from "../context/AppContext";

// const ActionTypes = {
//   SET_POSTS: "SET_POSTS",
//   SET_USERS: "SET_USERS"
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ActionTypes.SET_POSTS:
//       return { ...state, posts: action.payload };
//     case ActionTypes.SET_USERS:
//       return { ...state, users: action.payload };
//     default:
//       return state;
//   }
// };

// const initialState = {
//   posts: [],
//   users: []
// };

export default function Posts() {
  const {
    posts: { posts, postsDispatch },
    users: { users, usersDispatch },
  } = useAppContext();
  
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const postsData = await getAllPosts();
      const usersData = await getAllUsers();
      postsDispatch({ type: "FillPosts", payload: postsData });
      usersDispatch({ type: "FillUsers", payload: usersData });
      // dispatch({ type: ActionTypes.SET_POSTS, payload: postsData });
      // dispatch({ type: ActionTypes.SET_USERS, payload: usersData });
      setUsersLoaded(true);
    }
    fetchData();
  }, [postsDispatch, usersDispatch]);

  useEffect(() => {
    if (usersLoaded && posts.posts.length > 0 && users.users.length > 0 && !commentsLoaded) {
      const updatePostsWithCommentsCount = async () => {
        const updatedPosts = await Promise.all(
          posts.posts.map(async (post) => {
            const commentsCount = await getCommentsCountForPost(post.id);
            return { ...post, commentsCount };
          })
        );
        postsDispatch({ type: "FillPosts", payload: updatedPosts });
        setCommentsLoaded(true); // Marcamos los comentarios como cargados
      };
      updatePostsWithCommentsCount();
    }
  }, [usersLoaded, posts, users, postsDispatch, commentsLoaded]); 

  useEffect(() => {
    // Verificamos si los usuarios se han cargado y las publicaciones han cambiado
    if (usersLoaded && posts.posts.length > 0 && users.users.length > 0) {
      const postsWithUserNames = posts.posts.map((post) => {
        const user = users.users.find((user) => user.id === post.idUsuario);
        if (user) {
          return {
            ...post,
            userName: user.nombre,
            userPhoto: user.urlPerfil,
          };
        }
        return post;
      });
      // Verificamos si el estado ya ha sido actualizado con los nombres de usuario y las URL de las fotos de perfil
      if (
        !posts.posts.every(
          (post, index) =>
            post.userName === postsWithUserNames[index].userName &&
            post.userPhoto === postsWithUserNames[index].userPhoto
        )
      ) {
        postsDispatch({
          type: "FillPosts",
          payload: postsWithUserNames,
        });
      }
    }
  }, [usersLoaded, posts, users, postsDispatch,]);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1; // Genera un número aleatorio entre 1 y 100
  };

  return (
    <div className="home__posts">
      {posts.posts.length
        ? posts.posts.map((post) => (
            <div key={post.id} className="home__post">
              <div className="home__post-content">
                <div className="home__post-content-header">
                  <div className="home__post-content-header-user">
                    <img
                      src={post.userPhoto}
                      alt={post.userName}
                      className="home__post-content-header-user-img"
                    />
                  </div>
                  <b>{post.userName}</b>
                </div>
  
                {/* Renderizado condicional del contenido basado en la categoría */}
                {post.categoria === "Imagen" && (
                  <img
                    className="home__post-content-img"
                    src={post.recursos[0]}
                    alt="post"
                  />
                )}
                {post.categoria === "Album" && (
                  <div className="home__post-content-album">
                    {post.recursos.map((resource, index) => (
                      <img
                        key={index}
                        className="home__post-content-album-img"
                        src={resource}
                        alt={`Imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                {post.categoria === "Video" && (
                  <iframe
                    className="home__post-content-video"
                    title="video"
                    src={post.recursos[0]}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
  
                <div className="home__post-content-icons">
                  <div>
                    <FaRegHeart />
                    <p>{post.likes.length}</p>
                  </div>
                  <div>
                    <TbMessageCircle2 />
                    <p>{post.commentsCount}</p>
                  </div>
                  <div>
                    <FiSend />
                    <p>{getRandomNumber()}</p>
                  </div>
                  <div>
                    <FaRegBookmark />
                  </div>
                </div>
  
                <div className="home__post-content-footer">
                  <p>
                    <b>{post.userName}</b> {post.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
  
}
