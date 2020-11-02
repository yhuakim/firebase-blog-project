import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isInitialized, isLoading, ...rest }) => 
	<Route
		{...rest}
		render={(props) =>( 
				isInitialized === null ? <Redirect to='/' /> :<Component {...props} />
				)}
	/>

export default PrivateRoute
