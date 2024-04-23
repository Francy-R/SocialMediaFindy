import React, { createContext, useContext, useReducer } from 'react';

// Definimos el estado inicial del contexto
const initialState = { // ID del usuario amigo
    follow: false,
    // Puedes agregar más información relacionada con el usuario amigo si lo necesitas
};

// Creamos el contexto
const PerfilContext = createContext();

// Definimos el reducer para manejar las acciones sobre el estado
const perfilReducer = (state, action) => {
    switch (action.type) {
        case 'SEGUIR_USUARIO':
            return {
                ...state,
                follow: true
                // Aquí puedes agregar más acciones relacionadas con el seguimiento del usuario amigo
            };
        case 'DEJAR_DE_SEGUIR':
            return {
                ...state,
                follow:false
            }
        default:
            return state;
    }
};

// Creamos el provider del contexto
export const PerfilContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(perfilReducer, initialState);

    return (
        <PerfilContext.Provider value={{state, dispatch }}>
            {children}
        </PerfilContext.Provider>
    );
};

// Función personalizada para acceder al contexto
export const usePerfilContext = () => useContext(PerfilContext);