const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    case "EDITPROFILE":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
