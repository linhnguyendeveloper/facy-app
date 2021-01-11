import React from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
import Attendances from './pages/Attendances'
import 'antd/dist/antd.css'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}
require('firebase/database')
require('firebase')
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Attendances />
      </div>
    )
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App)
