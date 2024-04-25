import { useContext, useEffect, useState } from "react";
import "../pages/home/home.scss";
import { getAllUsers } from "../services/userServices";
import { FaPlus } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { AppContext } from "../router/AppRouter";

export default function Carousel() {
  const { user } = useContext(AppContext);
  const IdUser = user.id; // ID del usuario actual

  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener la lista de todos los usuarios
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        // Filtrar la información de los usuarios que sigue el usuario actual
        const currentUser = allUsers.find((user) => user.id === IdUser);
        if (currentUser) {
          setUserName(currentUser.nombre);
          setUserProfile(currentUser.urlPerfil);
          const followingIds = currentUser.seguidos || [];
          const following = allUsers.filter((user) =>
            followingIds.includes(user.id)
          );
          setFollowingUsers(following);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="home__stories">
      <div className="home__story">
        <div className="home__story-figure">
          <div className="home__story-container">
            <NavLink to={`/perfil/:${user.id}`}>
              <img
                src={userProfile}
                alt="user-profile"
                className="home__story-container-image"
              />
              <FaPlus className="plus" />
            </NavLink>
          </div>
          <p className="home__story-caption">Your story</p>
        </div>

        {followingUsers.map((user, index) => (
          <div className="home__story-figure" key={index}>
            <div className="home__story-container">
              <NavLink to={`/perfil/:${user.id}`}>
                <img
                  src={user.urlPerfil}
                  alt={`user-${index}`}
                  className="home__story-container-image-friends"
                />
              </NavLink>
            </div>
            <p className="home__story-caption">{user.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
