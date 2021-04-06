import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav>
                <input type="checkbox" id="check" />
                <label for="check" class="checkbtn">
                    <i class="fas fa-bars"></i>
                </label>
                <label class="logo"><Link to="/" style={{ textDecoration: 'none' , color: 'white'}}>Grocery Palace</Link></label>
                <ul>
                    <li><Link style={{ textDecoration: 'none' }} to="/">Home</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/orders">Orders</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/admin">Admin</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/deals">Deals</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} className="btn btn-info" to="/login">{loggedInUser.UserName ? loggedInUser.UserName : 'Login'}</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;