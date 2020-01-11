const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userExists: true,
                current_user: action.payload
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                userExists: false,
                current_user: {}
            }
        case "EDIT_PROFILE":
            return {
                ...state,
                current_user: action.payload
            }
        default:
            return state
    }
}

export default reducer