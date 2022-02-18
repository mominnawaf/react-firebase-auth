import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {firebaseApp} from './config/firebase'
import { Button, Card, Input } from '@material-ui/core';
import { useState } from 'react';
import Dashboard  from './components/Dashboard';
import Image from './assets/img.png';
import GoogleLogo from './assets/google-logo.png';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [intent, setIntent] = useState('Login');
  const provider = new GoogleAuthProvider();
    const auth = getAuth();
  const loginwithGoogle = () => {
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
const login = () => {
  if(email === '' || password === ''){
    alert("Please enter email and password")
  }
  else{
  signInWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    setUser(userCredential.user);
  })
  .catch((error) => {
    console.log(error)
  });
}
}
const signup = () => {
  if(email === '' || password === ''){
    alert("Please enter email and password")
  }
  else if(password !== confirmPassword){
    alert("Password and Confirm Password does not match")
  }
  else{
  createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    setUser(userCredential.user);
  })
  .catch((error) => {
    console.log(error)
  });
}
}
const renderLogin = () => {
  return(
    <>
     <Input placeholder='Email' className='input-class' onChange={(e)=>setEmail(e.target.value)}/>
              <Input placeholder='Password' className='input-class' type='password'onChange={(e)=>setPassword(e.target.value)} />
              <Button variant="contained" color="primary" className='login-btn' onClick={login}>Login</Button>
    </>
  )
}
const renderSignup = () => {
  return(
    <>
      <Input placeholder='Email' className='input-class' onChange={(e)=>setEmail(e.target.value)}/>
              <Input placeholder='Password' className='input-class' type='password'onChange={(e)=>setPassword(e.target.value)} />
              <Input placeholder='Confirm Password' className='input-class' type='password'onChange={(e)=>setConfirmPassword(e.target.value)} />
              <Button variant="contained" color="primary" className='login-btn' onClick={signup}>Signup</Button>
    </>
  )
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
             <div>
             <Button className='top-btn' onClick={()=>setIntent('Login')}>Login</Button>
             <Button className='top-btn' onClick={()=>setIntent('SignUp')}>Sign Up</Button>
             </div>
              {intent === 'Login' ? renderLogin() : renderSignup()}
             <Button onClick={loginwithGoogle} className="login-btn">
               <img src={GoogleLogo} alt="google-logo" className='google-logo'/>
                Login with Google
              </Button>
           </div>
         </Card>
       )}

    </div>
  )
}
