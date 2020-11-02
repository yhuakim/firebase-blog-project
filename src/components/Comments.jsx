import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Collapse } from 'reactstrap';
import firebase from '../services/firebase'

const Comments = ({id}) => {
    let today = new Date()
    let date = `${today.getFullYear()}/${today.getMonth() +1}/${today.getDate()}`
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    //const [modal, setModal] = useState(false);
    const [comment, setComment] = useState({
        content: '',
        timestamp: `${date}-${time}`
    })
    const [commentFeed, setCommentFeed] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    const { content, timestamp } = comment

    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })

    }

    useEffect(() => {
		try {
			firebase.db.ref('posts/' + id + '/comments').on('value', (snapshot) => {
				let commentFeed = []
				snapshot.forEach((snap) => {
					commentFeed.push(snap.val())
				})
                localStorage.setItem('commentFeed', JSON.stringify(commentFeed))
                setCommentCount(parseInt(commentFeed.length))
				setCommentFeed(JSON.parse(localStorage.getItem('commentFeed')))
			})
		} catch (error) {
            console.log(error.message)
            localStorage.removeItem('posts')
		}
	}, [])

    const postComment = async(e) => {
        e.preventDefault()
        try {
            if(firebase.isInitialized()) {
               let commentRef = await firebase.db.ref('posts/' + id ).child('comments').push()
               let commentId = commentRef.key
               
               commentRef.set({
                content: content,
                timestamp: timestamp,
                uid: commentId,
                author: firebase.auth.currentUser.displayName
                })
                
                console.log('success', firebase.isInitialized())
                setComment({
                    content: ''
                })

                toggle()
            }

        } catch (error) {
            console.log(error.message)
        } 
    }

    return (
        <div className='comment-box' >
            <div className="comment-count">
                {commentCount}
            </div>
            <i color="primary" className=' comment-btn fas fa-comment' onClick={toggle} style={{ marginBottom: '1rem' }}></i>
            <Collapse isOpen={isOpen}>
            {commentFeed.map((c)=> {
                let time = c.timestamp
                console.log(time)
                return (
                <div key={c.uid}>
                    <h3 className="author"></h3>
                    <span>{time}</span>
                    <p>{c.content}</p>
                </div>
                )
            })}

            <Form inline >
                <Input type="textarea" placeholder="add your comment" rows={5} name='content' value={content} onChange={handleChange} />

                <Button color="primary" onClick={postComment}>post</Button>

            </Form>
                
            </Collapse>
        </div>
    );
}

export default Comments;

{/* <Form inline >
                {' '}
                <Button color="danger" onClick={toggle}>comment {commentCount}</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Input type="textarea" placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} name='content' value={content} onChange={handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={postComment}>post</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal> */}