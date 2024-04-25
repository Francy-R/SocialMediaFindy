import axios from "axios"
import endpoints from "./endpoints";

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get(endpoints.getAllUsers);
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get(endpoints.getAllPosts);
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}
  
export const getUser = async (idUser) => {
    try {
        const { data } = await axios.get(endpoints.getUser(idUser));
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getCommentsCountForPost = async (postId) => {
    try {
        const { data } = await axios.get(endpoints.getCommentsByPostId(postId));
        return data.length;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getCommentsCountForPost = async (postId) => {
    try {
        const { data } = await axios.get(endpoints.getCommentsByPostId(postId));
        return data.length;
    } catch (error) {
        console.error(error);
        return [];
    }
}




export const getUserByEmailAndPassword = async ({ userName, password }) => {
    try {
        const { data } = await axios.get(
            endpoints.userByEmailAndPass(userName, password)
        )
        return data.length ? data[0] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createUser = async (newUser) => {
    try {
      const response = await axios.post(endpoints.users, newUser);
      return response;
    } catch (error) {
      console.log(error);
      return null
    }
  }