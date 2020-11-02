import React, { useState } from 'react';
import { Form, Input, Button, NavLink } from 'reactstrap'
import firebase from '../../services/firebase'
//import { login } from '../../helpers/Auth'
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';

const Login = ({isInit}) => {
    let history = useHistory()
    let location = useLocation()

    let { from } = { from: { pathname: '/feeds' } }

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
    console.log(isInit)

    const submitForm = async(e) => {
        e.preventDefault()
        
        try {
            await firebase.login(email, password)
            history.push('/feeds')
            window.location.replace('/feeds')

            return <Redirect to='/feeds' />
            
            
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
                className="input"
                />

                <Input 
                type='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={handleChange}
                className="input"
                />

                <Button onClick={submitForm} >Login</Button>
            </Form>
        </>
    );
}

export default Login;