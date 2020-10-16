import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase'
import Comments from '../Comments'
import Likes from '../Likes'

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
            <div key={uid}>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{content}</p>
                <Comments id={uid} />
				<Likes id={uid} />
            </div>
        )
    }) : <div>loading...</div>
}

export default Feeds
