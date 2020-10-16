import React from 'react'
import { Button } from 'reactstrap'
import firebase from '../../services/firebase'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

const Transfer = () => {
	let history = useHistory()

	const signOut = async () => {
		await firebase.logout()
		history.push('/')
		window.location.reload()
	}

	return (
		<div className='position-absolute'>
			<Button type='submit' onClick={signOut}>
				{' '}
				Sign out{' '}
			</Button>
			<h1>Transfer Page</h1>
		</div>
	)
}

export default Transfer
