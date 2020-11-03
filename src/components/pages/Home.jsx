import React from 'react';
import SignUp from '../Auth/SignUp';
import Feeds from '../Feed'
import firebase from '../../services/firebase'

const Home = ({isInitialized}) => {
    return (
        <>
            <div className="main">
                <div className="signup-box">
                    <SignUp isInitialized={isInitialized} />
                </div>
            </div>
        </>
    );
}

export default Home;