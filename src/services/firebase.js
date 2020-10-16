import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt8QevcHFvjRR05dSjbsIGsXqsJMoN1NE",
  authDomain: "transfer-app-9782e.firebaseapp.com",
  databaseURL: "https://transfer-app-9782e.firebaseio.com",
  projectId: "transfer-app-9782e",
  storageBucket: "transfer-app-9782e.appspot.com",
  messagingSenderId: "796129428509",
  appId: "1:796129428509:web:a83ef64606fe84c90fb2f4",
  measurementId: "G-ERFEFM32KZ"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.database()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.email
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUserEmail() {
    return this.auth.currentUser && this.auth.currentUser.email
  }

}

export default new Firebase()