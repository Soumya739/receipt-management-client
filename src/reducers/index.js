const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('token', action.payload.jwt);
            return {
                ...state,
                userExists: true,
                current_user: action.payload.user,
                gender: action.payload.user
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                state
            }
        case "EDIT_PROFILE":
            return {
                ...state,
                current_user: action.payload,
            }
        case "EDIT_RECEIPTS":
            return {
                ...state,
                receipts: action.payload
            }
        default:
            return state
    }
}

export default reducer