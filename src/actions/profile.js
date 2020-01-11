export const editProfile = (userDetails) => {
    return {
        type: "EDIT_PROFILE",
        payload: userDetails
    }
}