import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../services/firebase';

const Navbar = ({initialized}) => {
    let history = useHistory()
   
    const signOut = async () => {
		await firebase.logout()
		history.push('/')
		window.location.reload()
	}

    return (
        <>
            <nav className="navbar position-fixed navigations">
                <ul className="nav-list d-flex">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/transfer" className="nav-link">
                            Transfer
                        </a>
                    </li>
                    {initialized === null ? 
                    <> 
                        <li className="nav-item">
                            <a href="/signup" className="nav-link">
                                Sign Up
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link">
                                Login
                            </a>
                        </li>
                    </> : ''}
                </ul>
                <div className="brand-name">
                    <span className="text-white badge badge-primary ">
                        &times;
                    </span>
                    <h3 className="name">WaveTransfer</h3>
                </div>
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
                </ul>
            </nav>
        </>
    );
}

export default Navbar;