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
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                console.error("Sign-in error:", error.message);
                alert("Sign-in unsuccessful. Please check your email and password.");
            } finally {
                setIsSigningIn(false);
            }
        }
    }

    return (

        <div className='pagecontainer'>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div className="bgcontainer">
                <div className="box">
                    <div className="formcontainer">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <input placeholder='email' type="email" className="form-control" id="email" name="email"
                                    required onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            <div className="mb-3">

                                <input placeholder='password' type="password" className="form-control" id="password"
                                    name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <div className='links'>
                                <button type="submit" className="btn btn-primary">
                                    Login😁
                                </button>
                                <Link to={'/register'}> <button className="btn btn-success">
                                    Create an account?😁
                                </button></Link>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="image">
                    <img src={eye} alt="" />
                </div>
                <div className="black"></div>

            </div>

        </div>
    )
}

export default Login