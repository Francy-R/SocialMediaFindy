import axios from "axios"
import endpoint from "./endpoint";

export const getAllUsers = async() =>{
    try {
        const {data} = await axios.get(endpoint.getAllUsers);
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getUser = async(idUser) =>{
    try {
        const {data} = await axios.get(endpoint.getUser(idUser));
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}