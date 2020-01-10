export const login = (userDetails) => {
    return {
        type: "LOGIN",
        payload: userDetails
    }
}