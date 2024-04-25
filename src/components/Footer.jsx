import house from "../assets/house.png"
import search from "../assets/search.png"
import bell from "../assets/bell.png"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../router/AppRouter";
import { getUser } from "../services/userServices";


export default function Footer() {
    const { user } = useContext(AppContext); // Obtén el ID del usuario del contexto
    const [userProfile, setUserProfile] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // Obtener el perfil del usuario actual
                const profile = await getUser(user);
                setUserProfile(profile.urlPerfil);
                console.log("profile:", profile)
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div>
            <footer>
                <button><figure><img src={house}alt="house" className='icons' /></figure></button>
                <button><figure><img src={search}alt="search" className='icons' /></figure></button>
                <button><figure><img src={bell}alt="bell" className='icons' /></figure></button>
                <button><figure><img src={userProfile} alt="profile" className='icons'/></figure></button>
            </footer>
        </div>
    );
}



// export default function Footer() {
//     return (
//         <div>Footer</div>
//     )
// }
