// action es un objeto
import { useCallback , useEffect, useState} from "react";
import { getAllUsers } from "../services/userServices";

const perfilAmigo = (state, action) => {
    switch(action.type) {
        case "PerfilAmigo":
            const idAmigo = state.userAmigoId;
            return {
                ...state,
                userAmigoId: idAmigo // Actualiza el userAmigo en el estado con el usuario encontrado
                
            };
            
            
        default:
            return {
                ...state
            };
    }
}

export default perfilAmigo;