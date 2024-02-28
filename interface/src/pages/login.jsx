import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context/'
import '../home.css'
import eye from '../assets/raw.png'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
    }

    return (

        <div class='pagecontainer'>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="bgcontainer">
                <div class="box">
                    <div class="formcontainer">
                        <form onSubmit={onSubmit}>
                            <div class="mb-3">
                                <input placeholder='email' type="email" class="form-control" id="email" name="email"
                                    required onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            <div class="mb-3">

                                <input placeholder='password' type="password" class="form-control" id="password"
                                    name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <div class='links'>
                                <button type="submit" class="btn btn-primary">
                                    Login😁
                                </button>
                                <h4>New here?  <Link to={'/register'}> <button class="btn btn-success">
                                    Dont have an account?😁
                                </button></Link></h4>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="image">
                    <img src={eye} alt="" srcset="" />
                </div>
                <div class="black"></div>

            </div>

        </div>
    )
}

export default Login