import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import firebase from '../../services/firebase';
import Login from '../Auth/Login';
import logo from '../images/logo.png'
import Posts from '../Posts';

const Navbar = ({initialized}) => {
    let history = useHistory()
   
    const signOut = async () => {
		await firebase.logout()
		history.push('/')
		window.location.reload()
	}

    return (
        <>
            <nav className="position-fixed navigations">
                {initialized === null ? 
                <>
                    <div className="welcome">
                        <h1 className="">Welcome</h1>
                    </div>
                    <div className="branding">
                        <div className="logo-wrapper">
                            <img src={logo} alt="brand logo"/>
                        </div>

                        <Login isInit ={initialized} />
                    </div>
                </>: 
                <>
                    <div className="branding">
                        <div className="logo-wrapper">
                            <img src={logo} alt="brand logo"/>
                        </div>

                        <div className="navigation">
                            <ul className="nav-items">
                                <li className="nav-item">
                                    <NavLink href="/feeds" className="nav-link">
                                        Feeds
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href="/contact" className="nav-link">
                                        Contact
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href="/profile" className="nav-link">
                                        Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item mr-2">
                                    <Posts/>
                                </li>
                            </ul>

                            <div className="avatar-wrapper">
                                <div className="avatar">
                                    <a href="/dashboard" className="dashboard-link">
                                        <i className="fas fa-user-circle"></i>
                                    </a>
                                </div>

                                <div className="dropdown">
                                    <button className="dropbtn">
                                        <i className="fas fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content bg-danger">
                                        <a href="/dashboard">Dashboard</a>
                                        <hr/>
                                        <a href="#" onClick={signOut}>
                                            <i className="fas fa-power-off mr-2"></i>
                                         <span className="signout">Signout</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
{/* 
                <ul className="socials d-flex">
                    {initialized ? <ul><li className="nav-item">
                        <a href="#" onClick={signOut} className="nav-link">
                            Logout
                        </a>
                    </li>
                    <li className="nav-item">
                    <a href="/new-post"
                    className="nav-link">
                        Create Post
                    </a>
                </li></ul>
                    : ''}
                    <li className="social-item nav-item mr-2">
                        <a href="https://github.com/yhuakim/wave-transfer" className="social-link nav-link">
                            <i className="fas fa-github">github</i>
                        </a>
                    </li>
                    <li className="social-item nav-item mr-2">
                        <a href="https://twitter.com/@yhuakim" className="social-link nav-link">
                            <i className="fas fa-twitter">twitter</i>
                        </a>
                    </li>
                </ul> */}
            </nav>
        </>
    );
}

export default Navbar;