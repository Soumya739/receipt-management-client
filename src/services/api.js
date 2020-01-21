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

const getCurrentUser = () => {
    return fetch(Base_URL + "/current_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        }
    })
        .then(resp => resp.json())
}

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

const GetUserReceipts = () => {
    return fetch(Base_URL + "/user_receipts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }).then(resp => resp.json())
}

const getAllExpenseType = () => {
    return fetch(Base_URL + "/expense_types")
        .then(resp => resp.json())
}

const getReceiptsDataBasedOnExpenseType = (expenseType) => {
    return fetch(Base_URL + "/filtered_receipts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            category: expenseType
        })
    }).then(resp => resp.json())
}

const getAllStoresFromUserReceipts = () => {
    return fetch(Base_URL + "/stores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }).then(resp => resp.json())
}

const updateReceipt = (data) => {
    return fetch(Base_URL + `/receipts/${data.receiptId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            store: data.store,
            total_amount: data.total_amount,
            generated_on: data.generated_on,
            expense_type: data.expense_type,
            receipt_id: data.receiptId
        })
    })
        .then(resp => resp.json())
}

const get_amount_per_type = () => {
    return fetch(Base_URL + "/get_amount_per_type", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }).then(resp => resp.json())
}


export const api = {
    auth: {
        Login
    },
    user: {
        CreateUser,
        UpdateCurrentUser,
        getCurrentUser,
    },
    receipt: {
        GetUserReceipts,
        getAllStoresFromUserReceipts,
        updateReceipt,
        get_amount_per_type
    },
    expenseType: {
        getAllExpenseType,
        getReceiptsDataBasedOnExpenseType
    }
};