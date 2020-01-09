import React from 'react';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <NavLink to="/home"><button>Home</button></NavLink>
            <NavLink to="/photos"><button>Photos</button></NavLink>
            <NavLink to="/timeline"><button>Timeline</button></NavLink>
            <NavLink to="/profile"><button>Profile</button></NavLink>
            <NavLink to="/"><button>Logout</button></NavLink>
        </div>
    )
}
export default Navbar