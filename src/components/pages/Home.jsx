import React from 'react';
import SignUp from '../Auth/SignUp';
import Feeds from './Feeds'
import firebase from '../../services/firebase'

const Home = ({isInitialized}) => {
    console.log()
    console.log(firebase.isInitialized())
    return (
        <>
            <div className="banner">
               <p className="text text-center">
                   welcome to wave transfer
               </p>
            </div>
            {firebase.isInitialized() && isInitialized  ? "" :<SignUp/> }
            <Feeds/>
        </>
    );
}

export default Home;