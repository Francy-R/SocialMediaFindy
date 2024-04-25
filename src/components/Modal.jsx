import React, { useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../services/userServices';
import { AppContext } from '../router/AppRouter';

const Modal = ({ isOpen }) => {
    if (!isOpen) return null;
    const { user } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [users, setUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          // Obtener la lista de todos los usuarios
          const allUsers = await getAllUsers();
          setUsers(allUsers);
  
          // Filtrar la información de los usuarios que sigue el usuario actual
          const currentUser = allUsers.find(user => user.id === user.id);
          if (currentUser) {
  
            const followingIds = currentUser.seguidos || [];
            const following = allUsers.filter((user) => followingIds.includes(user.id));
            setFollowingUsers(following);
            console.log("seguidos",following)
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, []);


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Nueva publicación</h2>
                <form action="submit" className="modal-form">
                    <label htmlFor="imagen">Ingresa url de imagen</label>
                    <input
                        type="text"
                    />
                    <label htmlFor="descripcion">Descripcion de la publicación</label>
                    <input type="text" placeholder="Escribe texto o una descripción..." />
                    <label htmlFor="etiqueta">Etiqueta a un amigo</label>
                    <select name="etiquetar" id="" placeholder ="Selecciona">
                        <option value=""></option>
                        {/* Mapear los usuarios seguidos para obtener sus nombres */}
                        {followingUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.nombre}</option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    );
};

export default Modal;
