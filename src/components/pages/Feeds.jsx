import React from 'react'
/* import { Button } from 'reactstrap'
import firebase from '../../services/firebase'
import { Redirect, useHistory, useLocation } from 'react-router-dom' */

import Feed from '../Feed'
import Posts from '../Posts'

const Feeds = () => {
	return (
		<div className='feeds-box'>
			<div className="newpost">
				<Posts/>
			</div>
			<Feed/>
		</div>
	)
}

export default Feeds
