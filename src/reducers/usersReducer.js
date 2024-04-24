const usersReducer = (state, action) => {
  switch (action.type) {
    case "FillUsers":
      return {
        ...state,
        users: action.payload,
      };
      //Aquí van los demás casos
    default:
      return state;
  }
};

export default usersReducer;
