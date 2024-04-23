import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../services/userServices'; // Importamos la función getUser
import { usePerfilContext } from '../../context/PerfilContext';
import '../friend/friend.scss';
import axios from 'axios';
const Friend = () => {
    const [usuario2, setUsuario] = useState([]); // Cambiamos a un solo usuario en lugar de una lista
    const {state, dispatch } = usePerfilContext(); // Obtenemos el ID del usuario amigo del contexto
    const userAmigo = 2;
    const [following, setFollowing] = useState(false);
    const fetchData = useCallback(async () => {
        try {
            const response = await getUser(userAmigo); // Llamamos a getUser con el ID del usuario amigo
            setUsuario(response);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let usuario;
    usuario = {...usuario2[0]};
    console.log(usuario)
    useEffect(() => {
        if (usuario === null && typeof usuario.length == 'undefined') {
            console.log("Calma");
        }
    }, [usuario]);
    console.log(state)
    const updateFollowingArray = async (userId,userAmigo) => {
        try {

            // Realiza una solicitud HTTP al servidor para actualizar los datos del usuario
            const response = await axios.patch(`https://mini-back-findy-dl2h.onrender.com/usuarios/${userId}`, {
                seguidos: [userAmigo]
            });
            return response.data
    
            // Si la solicitud se completa correctamente, retorna el arreglo de usuarios actualizado
        } catch (error) {
            // Si ocurre un error durante la solicitud, maneja el error apropiadamente
            console.error('Error updating user:', error);
            
            
        }
    };
    const deleteFollowingArray = async (userId,userAmigo) => {
        try {

            // Realiza una solicitud HTTP al servidor para actualizar los datos del usuario
            const response = await axios.get(`https://mini-back-findy-dl2h.onrender.com/usuarios/${userId}`);
            const userData = response.data;
            const indexToRemove = userData.seguidos.indexOf(userAmigo);

            if (indexToRemove !== -1) {
                userData.seguidos.splice(indexToRemove, 1);
            }
    
           
            const patchResponse = await axios.patch(`https://mini-back-findy-dl2h.onrender.com/usuarios/${userId}`, {
                seguidos: userData.seguidos
            });
            return patchResponse.data

        } catch (error) {
          
            console.error('Error updating user:', error);
            
        }
    };
    useEffect(() => {
        // Actualizar el estado de seguimiento cuando cambia el estado en el contexto
        setFollowing(state.follow);
    }, [state]);



    const handleClick = async () => {
        if (!following) {
            dispatch({ type: 'SEGUIR_USUARIO' });
            updateFollowingArray(1, userAmigo)
        } else {
            dispatch({ type: 'DEJAR_DE_SEGUIR' });
            deleteFollowingArray(1,userAmigo)

        }
    };

    
    return (
        <div>
            {usuario.length === null ? (
                <p>Cargando...</p>
            ) : (
                <main key={usuario.id}>
                    <section className='Portada'>
                        <img src={usuario.urlBanner} className='imagenPortada' alt='Banner' />
                    </section>

                    <section className='headerInfo'>
                        <div>
                            <p className="textNum">{usuario.seguidores ? usuario.seguidores.length : 0}</p>
                            <p className="subText">Seguidores</p>
                        </div>
                        <img src={usuario.urlPerfil} className='imagePerfil' alt='Perfil' />
                        <div>
                            <p className="textNum">{usuario.totalLikes}</p>
                            <p className="subText">Likes</p>
                        </div>
                    </section>

                    <div className='infoPersona'>
                        <p className="textName">{usuario.nombre}</p>
                        <p>{usuario.estado}</p>
                        <div className="estiloBotones">
                            <button className='botonDinamico' onClick={handleClick}>
                                {following ? 'Dejar de seguir' : 'Seguir'}
                            </button>
                            <button className='botonDinamico'>
                                Mensaje
                            </button>
                        </div>
                    </div>

                    <section className="detallesPublicaciones">
                        {/* Aquí puedes mostrar las publicaciones del usuario si lo deseas */}
                    </section>
                </main>
            )}
        </div>
    );

    
};

export default Friend;