import React, { useState } from 'react';
import { Form, Input, Button, NavLink } from 'reactstrap'
import firebase from '../../services/firebase'
//import { login } from '../../helpers/Auth'
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';

const Login = () => {
    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: '/' } }

    const [loginDetail, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    
    const [error, setError] = useState(null)

    const { email, password } = loginDetail

    const handleChange = (e) => {
        setLoginDetails({
            ...loginDetail,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async(e) => {
        e.preventDefault()
        
        try {
            await firebase.login(email, password)
            //return <Redirect to={{pathname: '/transfer'}} />
            history.replace(from)
            window.location.reload()
            
        } catch (error) {
            setError({
                error: error.message
            })

            alert(error.message)

            console.log(error)
        }
    }
    return (
        <>
            <Form className='form'>
                <Input 
                type='email'
                name='email'
                value={email}
                placeholder='Enter your Email'
                onChange={handleChange}
                />

                <Input 
                type='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={handleChange}
                />

                <Button onClick={submitForm} >Login</Button>

                <p className="register-instead">
                    Don't Have an account? 
                    <NavLink href='/signup' >Sign Up</NavLink>
                </p>
            </Form>
        </>
    );
}

export default Login;