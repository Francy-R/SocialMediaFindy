import { useEffect, useState } from "react";
import "../home/home.scss";
import { getUser, getAllUsers } from "../../services/userServices";
import { PiChatsCircleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

export default function Home() {
  const IdUser = 1; // ID del usuario actual

  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener la lista de todos los usuarios
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        // Filtrar la información de los usuarios que sigue el usuario actual
        const followingIds = allUsers.find(user => user.id === IdUser)?.seguidos || [];
        const following = allUsers.filter((user) => followingIds.includes(user.id));
        setFollowingUsers(following);

        // Obtener el nombre del usuario actual
        const currentUser = allUsers.find(user => user.id === IdUser);
        if (currentUser) {
          setUserName(currentUser.nombre);
          setUserProfile(currentUser.urlPerfil)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="home__header">
        <img src="../../assets/findyLogo.png" alt="logo"/>
        <div className="home__header-icon" >
        <FaRegHeart className="home__header-icon-1" />
        <PiChatsCircleBold className="home__header-icon-2" />
        </div>
      </div>
      <h1>Hola, {userName}</h1>
      <p>{userProfile}</p>
      <img src={userProfile} />
      <h2>Usuarios que sigues:</h2>
      <ul>
        {followingUsers.map((user, index) => (
          <li key={index}>{user.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
