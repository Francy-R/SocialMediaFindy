const postsReducer = (state, action) => {
    switch (action.type) {
        case 'FillPosts':
            return{
                ...state,
                posts: action.payload
            }
        case 'CreatePosts':
            return{
                ...state,
                posts:[...state.posts, action.payload]
            }
        //Pueden definir más casos
        default:
            return state
    }
}

export default postsReducer;