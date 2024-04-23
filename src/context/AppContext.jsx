import { createContext, useContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import postsReducer from "../reducers/postsReducer";
import usersReducer from "../reducers/usersReducer";

// 1. Crear el contexto

const AppContext = createContext(null);

// 2. Proveer el contexto

export const AppContextProvider = ({ children }) => {
  //4.2. Aquí vamos a declarar los estados con useReducer para poderlos compartir en el contexto

  const initialAuth = {
    user: null,
    isAuth: false,
  };

  const initialPosts = {
    posts: [],
    categories: [],
    // isActiveFilter: false,
  };

  const initialUsers = {
    users: [],
  };

  const initialComments = {
    comments: [],
  };

  const [auth, authDispatch] = useReducer(authReducer, initialAuth);
    const [posts, postsDispatch] = useReducer(postsReducer, initialPosts);
    const [users, usersDispatch] = useReducer(usersReducer, initialUsers)

  const globalState = {
    auth: { auth, authDispatch },
    posts: { posts, postsDispatch },
    users: { users, usersDispatch },
    comments: {},
  };

  return (
    <AppContext.Provider value={{ ...globalState }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Crear el hook personalizado para poder consumir el contexto en cualquier componentente

export const useAppContext = () => useContext(AppContext);
