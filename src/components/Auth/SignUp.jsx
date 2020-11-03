import React, { useState } from 'react'
import { Form, Input, Button, NavLink } from 'reactstrap'
import firebase from '../../services/firebase'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import Feeds from '../Feed'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faGithub } from '@fortawesome/free-brands-svg-icons'
//import { signup } from '../../helpers/Auth'

const SignUp = ({isinitialized}) => {
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
				history.push('/feeds')
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

	return isinitialized ? <Redirect to='/feeds' /> :(
		<div className='container signup'>
			<Form onSubmit={submitForm} className='form'>
				<Input
					type='email'
					name='email'
					value={email}
					className='input'
					placeholder='Enter Email'
					autoComplete={false}
					onChange={handleChange}
				/>

				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Create password'
					minLength={6}
					onChange={handleChange}
					className='input'
				/>

				<Input
					type='password'
					name='password2'
					value={password2}
					placeholder='Confirm password'
					className='input'
					onChange={handleChange}
				/>

				<Button>Sign Up</Button>

				<ul className='social-icon'>
					<li className='twitter'>
						<a href='https://twitter.com/@yhuakim' className='twitter-link'>
							<i className='fab fa-twitter' />
						</a>
					</li>
					<li className='whatsapp'>
						<a href='https://twitter.com/@yhuakim' className='whatsapp-link'>
							<i className='fab fa-whatsapp' />
						</a>
					</li>
					<li className='github'>
						<a href='https://github.com/yhuakim' className='github-link'>
							<i className="fab fa-github-alt"></i>
						</a>
					</li>
					<li className='facebook'>
						<a href='https://facebook.com/JoachimArinze' className='facebook-link'>
							<i className='fab fa-facebook' />
						</a>
					</li>
				</ul>
			</Form>
		</div>
	) 
}

export default SignUp
