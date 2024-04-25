import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getAllPosts } from '../../services/userServices'; // Importamos la función getUser

import '../friend/friend.scss';
import { useAppContext } from "../../context/AppContext";
import axios from 'axios';

const Friend = () => {
    const { id } = useParams();
    const userAmigo = String(id.substring(1));
    const [usuario, setUsuario] = useState([]);
    const [postId, setPost] = useState([]);
    const [following, setFollowing] = useState(false);
    const [fotoPost, setFotoPost] = useState(null);
    const [videos, setvideos] = useState(null);
    const [album, setalbum] = useState(null);
    const [tag, settag] = useState(false);
    const [tipoContenido, setTipoContenido] = useState(null);

    const {
        posts: { posts, postsDispatch },
        auth: { auth, authDispatch },
        users: { users, usersDispatch }

    } = useAppContext();


    const fetchData = useCallback(async () => {
        try {
            const response = await getUser(userAmigo);
            const postsData = await getAllPosts();
            postsDispatch({ type: "FillPosts", payload: postsData });
            postsDispatch({ type: "FindPostId", payload: userAmigo });


            // Llamamos a getUser con el ID del usuario amigo
            setPost(postsData[0]);

            setUsuario(response[0]);

        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [postsDispatch]);

    useEffect(() => {
        fetchData();

    }, [fetchData]);
    console.log(postId);

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

    const handleClick2 = () => {
        if (!following) {
            updateFollowingArray(1, userAmigo)
                .then(() => setFollowing(true)) //
                .catch(error => console.error('Error updating following:', error));
        } else {
            deleteFollowingArray(1, userAmigo)
                .then(() => setFollowing(false)) // Actua
                .catch(error => console.error('Error updating following:', error));
        }
    };


    const handleClick = (categoria) => {
        console.log(posts);
        let recursos = null;

        console.log("Categoría seleccionada:", categoria);
        if (categoria === "Imagen") {

            postsDispatch({ type: "categorie", payload: "Imagen" });
            recursos = posts.posts && posts.posts.length > 0 && posts.posts[0].recursos;
            setFotoPost(recursos ? Array.from(recursos) : null);
            console.log(fotoPost)
            setTipoContenido("Imagen");
        } else if (categoria === "Video") {

            postsDispatch({ type: "categorie", payload: "Video" });
            recursos = posts.posts && posts.posts.length > 0 && posts.posts[0].recursos;
            setvideos(recursos ? Array.from(recursos) : null);

            setTipoContenido("Video");
        } else if (categoria === "Album") {

            postsDispatch({ type: "categorie", payload: "Album" }); 0
            recursos = posts.posts && posts.posts.length > 0 && posts.posts[0].recursos;
            setalbum(recursos ? Array.from(recursos) : null);

            setTipoContenido("Album");

        }
        else if (categoria === "etiquetas") {
            const postetiqueta = usuario.etiquetas;
        };
    };

    return (
        <div>
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
                        <button className='botonDinamico' onClick={handleClick2}>
                            {following ? 'Dejar de seguir' : 'Seguir'}
                        </button>
                        <button className='botonDinamico'>
                            Mensaje
                        </button>
                    </div>
                </div>

                <section className="detallesPublicaciones">
                    <div className='headerDetalles'>
                        <p onClick={() => handleClick("Imagen")}> Fotos </p>
                        <p onClick={() => handleClick("Video")}> Videos </p>
                        <p onClick={() => handleClick("Album")}> Albums</p>
                        <p onClick={() => handleClick("etiquetas")} > Tags </p>
                    </div>

                    <div className='seccionFotos'>
                        {tipoContenido === "Imagen" && fotoPost !== null ? (
                            fotoPost.map((elemento, index) => (
                                <img key={index} src={elemento} alt={`Foto ${index}`} />
                            ))
                        ) : tipoContenido === "Video" && videos !== null ? (
                            videos.map((video, index) => (
                                <iframe
                                    key={index}
                                    width="200"
                                    height="200"
                                    src={video}
                                    title="Video de YouTube"
                                    allowFullScreen
                                ></iframe>
                            ))
                        ) : tipoContenido === "Album" && album !== null ? (
                            album.map((imagen, index) => (
                                <img key={index} src={imagen} alt={`Foto ${index}`} />
                            ))
                        ) : tipoContenido === "etiquetas" && postId && postId.recursos ? (
                            postId.recursos.map((recurso, index) => (
                                <img key={index} src={recurso} alt={`Foto ${index}`} />
                            ))
                        ) : (
                            <p>No hay publicaciones</p>
                        )}
                    </div>


                </section>
            </main>

        </div >
    );
};

export default Friend