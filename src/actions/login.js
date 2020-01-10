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