import React, { useState } from 'react'
import { Form, Input, Button, NavLink } from 'reactstrap'
import firebase from '../../services/firebase'
import { useHistory, useLocation } from 'react-router-dom'
//import { signup } from '../../helpers/Auth'

const SignUp = () => {
	let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: '/' } }

	const [
		signupDetails,
		setSignUpDetails,
	] = useState({
		email: '',
		password: '',
		password2: '',
	})

	const [
		error,
		setError,
	] = useState(null)

	const { email, password, password2 } = signupDetails

	const handleChange = (e) => {
		setSignUpDetails({
			...signupDetails,
			[e.target.name]: e.target.value,
		})
	}

	const submitForm = async (e) => {
		e.preventDefault()
		if (password === password2) {
			setError({ error })
			try {
				await firebase.register(email, password)
				console.log('success')
				history.push(from)
			} catch (error) {
				setError({
					error: error.message,
				})
				console.log(error)
			}
		} else {
			setError({
				...error,
				error: 'Password Mismatch',
			})
			console.log(error)
		}
	}

	return (
		<div className='container signup'>
			<Form onSubmit={submitForm} className='form'>
				<Input type='email' name='email' value={email} placeholder='Enter your Email' onChange={handleChange} />

				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Enter your password'
					minLength={6}
					onChange={handleChange}
				/>

				<Input
					type='password'
					name='password2'
					value={password2}
					placeholder='Confirm your password'
					onChange={handleChange}
				/>

				<Button>Sign Up</Button>

				<p className='login-instead'>
					Already Have an account?
					<NavLink href=''>Login</NavLink>
				</p>
			</Form>
		</div>
	)
}

export default SignUp
