const postsReducer = (state, action) => {
    switch (action.type) {
        case 'FillPosts':
            return {
                ...state,
                posts: action.payload
            }
        case 'CreatePosts':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        case "FindPostId":
            const postId = action.payload
            const array2 = Array.from(state.posts)
            const postsId = array2.filter(post => post.idUsuario == postId);
            return {
                ...state,
                posts: postsId
            }
        case "categorie":
            const categoria = action.payload
            const array = Array.from(state.posts)
            const postCategory = array.filter(post => post.categoria === categoria)
            return {
                ...state,
                category: postCategory
            }
        case "FindIdPost":
            const postId2 = action.payload
            const array3 = Array.from(state.posts)
            const postsId2 = array3.find(post => post.id == postId2);
            return {
                ...state,
                posts: postsId2
            }
        //Pueden definir más casos
        default:
            return state
    }
}

export default postsReducer;