import React, { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Navbar from './components/layout/Navbar'
import firebase from './services/firebase'
import PrivateRoute from './components/layout/PrivateRoute'
import Transfer from './components/pages/Transfer'
import Posts from './components/Posts'



const App = () => {
	const [
		initialized,
		setInitialized,
	] = useState(false)
	const [
		loading,
		setLoading,
	] = useState(true)


	useEffect(() => {
		firebase.isInitialized().then(val => {
			setInitialized(val)
			setLoading(false)
		})
	}, [firebase.isInitialized(), setInitialized])

	const {isLoading} = loading

	console.log( initialized, loading )

	return (
		<Router>
			<Navbar initialized={initialized} />
			<Switch>
        <Route path='/'  exact > 
		<Home isInitialized={initialized} isLoading={loading} />
		 </Route>
				<Route path='/signup' component={SignUp} exact />
				<Route path='/login' component={Login} exact />
				<PrivateRoute
					path='/transfer'
					component={Transfer}
					isInitialized={initialized}
					isLoading={isLoading}
					exact
				/>
				<PrivateRoute
					path='/new-post'
					component={Posts}
					isInitialized={initialized}
					isLoading={isLoading}
					exact
				/>
			</Switch>
		</Router>
	)
}

export default App
