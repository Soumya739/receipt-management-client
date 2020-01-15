const Base_URL = "http://localhost:3000"

const Login = (data, password = {}) => {
    let userDetails = Object.assign(data, password)
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
                return res
            } else {
                alert(res.error)
                return res.error
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
                gender: data.gender,
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

const UpdateCurrentUser = (userDetails) => {
    return fetch(Base_URL + `/users/${userDetails.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user: {
                username: userDetails.username,
                email: userDetails.email,
                gender: userDetails.gender,
                contact_num: userDetails.contact_num,
                city: userDetails.city,
                country: userDetails.country,
                state: userDetails.state,
                password: userDetails.password,
                password_confirmation: userDetails.password_confirmation
            }
        })
    }
    )
        .then(resp => resp.json())
        .then((user) => Login(user, { password: userDetails.password }))
}

const GetUserReceipts = (userID) => {
    return fetch(Base_URL + "/user_receipts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user_id: userID
        })
    }).then(resp => resp.json())
}

// const getAllExpenseType = () => {
//     return fetch(Base_URL + "/expense_types", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Accepts: 'application/json',
//             Authorization: localStorage.getItem('token')
//         },
//         body: JSON.stringify({
//             user_id: userID
//         })
//     }).then(resp => resp.json())
// }


export const api = {
    auth: {
        Login
    },
    user: {
        CreateUser,
        UpdateCurrentUser,
    },
    receipt: {
        GetUserReceipts,
    },
    // expenseType: {
    //     getAllExpenseType
    // }
};