import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {firebaseApp} from './config/firebase'
import { Button, Card } from '@material-ui/core';
import { useState } from 'react';
import Dashboard  from './components/Dashboard';
import Image from './assets/img.png';
import GoogleLogo from './assets/google-logo.png';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
    const auth = getAuth();
  const login = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            setUser(result.user);
        }).catch((error) => {
            console.log(error)
        });
}
const logout = () => {
  auth.signOut()
  .then(() => {
    setUser(null);
  })
  .catch((error) => {
    console.log(error)
  });
}
  return (
    <div>
      {user ? (
      <Dashboard name={user.displayName} image={user.photoURL} email={user.email} logout={logout} />
      )
       : 
       (
         <Card className='login-card'>
           <img src={Image} alt="login-img" className='img-class'/>
           <div className='login-container'>
             <p className='welcome-text'>Welcome back</p>
             <h3>Login to your account</h3>
             <Button onClick={login} className="login-btn">
               <img src={GoogleLogo} alt="google-logo" className='google-logo'/>
                Login with Google
              </Button>
           </div>
         </Card>
       )}

    </div>
  )
}
