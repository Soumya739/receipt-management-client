const Base_URL = "http://localhost:3000"

const Login = (data, password = {}) => {
    let userDetails = Object.assign(data, password)
    console.log("data", data, password, userDetails)
    return fetch(`${Base_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(userDetails)
    })
        .then(resp => resp.json())
        .then(res => {
            if (!res.error) {
                localStorage.setItem('token', res.jwt);
                return { username: res.username, email: res.email }
            } else {
                alert(res.error)
            }
        })
};

const CreateUser = (data) => {
    return fetch(Base_URL + '/users', {
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
        .then((user) => Login(user, { password: data.password }))
}

export const api = {
    auth: {
        Login
    },
    user: {
        CreateUser,
    }
};