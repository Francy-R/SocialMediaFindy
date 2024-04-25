import house from "../assets/house.png"
import search from "../assets/search.png"
import bell from "../assets/bell.png"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../router/AppRouter";
import { getUser } from "../services/userServices";
import { NavLink } from "react-router-dom";


export default function Footer() {
    const { user } = useContext(AppContext); // Obtén el ID del usuario del contexto
    // const IdUser = user.id;
    const [userLogin, setUser] = useState([]);
    const [userProfile, setUserProfile] = useState("");

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             // Obtener el perfil del usuario actual
    //             const profile = await getUser(user);
    //             setUser(profile);

    //             const profileUser = profile.find((user) => user.id === IdUser);
    //             if (profileUser) {
    //                 setUserProfile(profileUser.urlPerfil);
    //               }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     if (user) {
    //         fetchData();
    //     }
    // }, [user]);

    return (
        <div>
            <footer>
                <button><figure><img src={house}alt="house" className='icons' /></figure></button>
                <button><figure><img src={search}alt="search" className='icons' /></figure></button>
                <button><figure><img src={bell}alt="bell" className='icons' /></figure></button>
                <NavLink to={`/perfil/:${user.id}`}><figure><img src={user.urlPerfil} alt="profile" className='footer_profile'/></figure></NavLink>
            </footer>
        </div>
    );
}



// export default function Footer() {
//     return (
//         <div>Footer</div>
//     )
// }
