import { useEffect, useState } from "react";
import "../pages/home/home.scss";
import {getAllUsers } from "../services/userServices";

export default function Carousel() {

    const IdUser = 1; // ID del usuario actual

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
        const currentUser = allUsers.find(user => user.id === IdUser);
        if (currentUser) {
          setUserName(currentUser.nombre);
          setUserProfile(currentUser.urlPerfil);

          const followingIds = currentUser.seguidos || [];
          const following = allUsers.filter((user) => followingIds.includes(user.id));
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
          <figure className="home__story-figure">
            <img src={userProfile} alt="user-profile" className="home__story-image" />
            <figcaption className="home__story-caption">Your story</figcaption>
          </figure>
          
        {followingUsers.map((user, index) => (
            <figure className="home__story-figure" key={index}>
              <img src={user.urlPerfil} alt={`user-${index}`} className="home__story-image-friends" />
              <figcaption  className="home__story-caption">{user.nombre}</figcaption>
            </figure>
        ))}
        </div>
      </div>
  )
}
