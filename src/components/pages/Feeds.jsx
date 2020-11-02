import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase'
import Comments from '../Comments'
import Likes from '../Likes'
import Posts from '../Posts'

const Feeds = () => {
	const [
		posts,
		setPosts,
	] = useState([])

	useEffect(() => {
		try {
			firebase.db.ref('posts').on('value', (snapshot) => {
				let posts = []
				snapshot.forEach((snap) => {
					posts.push(snap.val())
				})
				localStorage.setItem('posts', JSON.stringify(posts))
				setPosts(JSON.parse(localStorage.getItem('posts')))
			})
		} catch (error) {
            console.log(error.message)
            localStorage.removeItem('posts')
		}
	}, [])

	return posts ? posts.map(post => {
        const {content, description, title, timestamp, uid } = post
        return (
            <div key={uid} className="posts-container">
				<div className="newpost">
					<Posts/>
				</div>
				<hr/>
				<div className="header">
					<div className="circle-avatar mr-2">
						<span className="letter">J</span>
					</div>
					<div className="username">
						<h1 className="name">Arinze Joachim</h1>
						<small className="date"></small>
					</div>
				</div>

				<div className="post-content">
					<h2 className="heading">
						<a href="#" className="read-more">
							{title}
						</a>
					</h2>
					<h4 className="description">
						{description}
					</h4>
					<p className='content'>
						{content}
					</p>
				</div>
				<hr/>
                <div className="footer d-flex">
					<div className="like">
					<Likes id={uid} />
					</div>
					<div className="comment">
					<Comments id={uid} />
					</div>
				</div>
				<hr/>
            </div>
        )
    }) : <div>loading...</div>
}

export default Feeds
