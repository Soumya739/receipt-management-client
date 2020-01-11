export const login = (userDetails) => {
    return {
        type: "LOGIN",
        payload: userDetails
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}
export const editProfile = (userDetails) => {
    return {
        type: "EDIT_PROFILE",
        payload: userDetails
    }
}