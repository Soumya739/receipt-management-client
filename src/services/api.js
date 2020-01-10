const POST_URL = "http://localhost:3000/users"

const CreateUser = (data) => {
    return fetch(POST_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user: {
                username: data.username,
                email: data.email,
                contact_num: data.contact_num,
                city: data.city,
                country: data.country,
                state: data.state,
                password: data.password,
                password_confirmation: data.password_confirmation
            }
        })
    }
    )
        .then(resp => resp.json())
}


export const api = {
    user: {
        CreateUser,
    }
};