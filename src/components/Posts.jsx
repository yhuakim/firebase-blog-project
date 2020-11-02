import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {uuid} from 'uuidv4'
import firebase from '../services/firebase'

const Posts = () => {
    const [postDetails, setPostDetails] = useState({
        title: '',
        description: '',
        content: '',
        timestamp: Date.now(),
        uid: uuid()
    })
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const { title, description, content, author, timestamp, uid } = postDetails

    console.log(author)

    const handleChange = (e) => {
        setPostDetails({
            ...postDetails,
            [e.target.name]: e.target.value
        })
    }

    const submit = async(e) => {
        e.preventDefault()
        try {
            if(firebase.isInitialized()) {
               let postRef = await firebase.db.ref('posts').push()
               let postId = postRef.key
               
               postRef.set({
                title: title,
                description: description,
                content: content,
                timestamp: timestamp,
                uid: postId,
                author: firebase.auth.currentUser.displayName
                })
                
                console.log('success', firebase.isInitialized())
                setPostDetails({
                    title: '',
                    description: '',
                    content: ''
                })

                return <Redirect to='/posts' />
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Button color="danger" onClick={toggle}>Create Post</Button>
            <Modal isOpen={modal} toggle={toggle} className='' >
                <ModalHeader toggle={toggle}>Create a Post</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for='title' >
                                Title
                            </Label>
                            <Input
                            type='text' 
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={handleChange}
                            required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='description' >
                                Description
                            </Label>
                            <Input
                            type='text'
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={handleChange}
                            required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='content' >
                                Body
                            </Label>
                            <Input
                            type='textarea' 
                            placeholder='Enter your post'
                            name='content'
                            value={content}
                            onChange={handleChange}
                            required
                            />
                        </FormGroup>

                        <Button>Post</Button>
                        <a href="#">cancel</a>
                    </Form>
                </ModalBody>
                </Modal>
                {/* <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
        </>
    );
}

export default Posts;


