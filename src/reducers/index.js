const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userExists: true,
                current_user: action.payload
            }
        default:
            return state
    }
}

export default reducer