import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import firebase from '../services/firebase'

const Likes = ({id}) => {
    const [like, setLike] = useState(false)
    let [likeCount, setLikeCount] = useState(0)

    const changeLike = async() => {
        setLike(!like)

        console.log(like)

        setLikeCount(likeCount++)
        let postRef = firebase.db.ref('posts/' + id )
        let likeRef = firebase.db.ref('posts/' + id + '/likes/' + firebase.auth.currentUser.uid)

        if(like === true) {
            likeRef.transaction((lik) => {
                if(lik === null) {
                    likeRef.set({
                        isLiked: like,
                        id: firebase.auth.currentUser.uid
                    })
                }
            })

        } else {
            likeRef.remove()
        }
    }
    
    useEffect(() => {
		try {
			firebase.db.ref('posts/' + id + '/likes').on('value', (snapshot) => {
				let likeCount = []
				snapshot.forEach((snap) => {
                    likeCount.push(snap.val())
                    console.log(snap.val())
				})
                setLikeCount(parseInt(likeCount.length))
			})
		} catch (error) {
            console.log(error.message)
		}
    }, [])
    
    return (
        <>
            <Button className={likeCount === 0 ? '' : 'text-danger'} onClick={changeLike}> &hearts; {likeCount}</Button>
        </>
    );
}

export default Likes;