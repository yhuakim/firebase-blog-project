import {
    auth
} from '../services/firebase'

export function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}

export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}