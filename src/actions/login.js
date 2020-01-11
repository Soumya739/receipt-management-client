export const login = (data) => {
    console.log("in login action")
    return {
        type: "LOGIN",
        payload: data
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