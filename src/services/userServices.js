import endpoints from "./endpoints";
import axios from "axios";



export const getUserByEmailAndPassword = async ({userName, password}) => {
    try {
        const { data } = await axios.get(
            endpoints.userByEmailAndPass(userName, password)
        )
        return  data.length? data[0]:null;
    }catch (error){
        console.log(error);
        return null;
    }
    

}