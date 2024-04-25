import React, { useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../services/userServices';
import { AppContext } from '../router/AppRouter';

const Modal = ({ isOpen }) => {
    if (!isOpen) return null;
    const { user, allUsers, setAllUsers } = useContext(AppContext);
    useEffect(() => {
      // Obtener todos los usuarios y guardarlos en el estado
      getAllUsers()
          .then(users => setAllUsers(users))
          .catch(error => console.error('Error fetching users:', error));
  }, []);
    
    const getUserNameById = (userId) => {
      const foundUser = allUsers.find(user => user.id === userId);
      return foundUser ? foundUser.nombre : "Usuario no encontrado";
  };
    console.log("datos", user.seguidos)

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Nueva publicación</h2>
                <form action="submit" className="modal-form">
                    <label >Ingresa url de imagen</label>
                    <input
                        type="text"
                        name="recursos"
                    />
                    <label >Descripcion de la publicación</label>
                    <input type="text" name ="descripcion" placeholder="Escribe texto o una descripción..." />
                    <label >Etiqueta a un amigo</label>
                    <select name="etiquetados" id="" placeholder ="Selecciona">
                        <option value=""></option>
                        {/* Mapear los usuarios seguidos para obtener sus nombres */}
                        {user.seguidos.map(userId => (
                            <option key={userId} value={userId}>{getUserNameById(userId)}</option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    );
};

export default Modal;
