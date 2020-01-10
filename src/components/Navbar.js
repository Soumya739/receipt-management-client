import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/login';

const Navbar = (props) => {
    const onLogout = () => {
        props.logout()
        window.location.replace("http://localhost:3001/")
    }
    return (
        <div>
            <NavLink to="/home"><button>Home</button></NavLink>
            <NavLink to="/photos"><button>Photos</button></NavLink>
            <NavLink to="/timeline"><button>Timeline</button></NavLink>
            <NavLink to="/profile"><button>Profile</button></NavLink>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (user) => dispatch(logout(user)),
    }
}

export default connect(null, mapDispatchToProps)(Navbar)