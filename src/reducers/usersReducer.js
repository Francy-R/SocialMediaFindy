const usersReducer = (state, action) => {
  switch (action.type) {
    case "FillUsers":
      return {
        ...state,
        users: action.payload,
      };
    case 'SEGUIR_USUARIO':
      return {
        ...state,
        follow: true
      };
    case 'DEJAR_DE_SEGUIR':
      return {
        ...state,
        follow: false
      };
    

    default:
      return state;
  }
};

export default usersReducer;
