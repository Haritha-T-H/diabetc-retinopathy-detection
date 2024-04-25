import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context'
import '../home.css'
import abstract from '../assets/abstract.png'
import machine from '../assets/machine.jpg'

const Display = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await doSignInWithEmailAndPassword(email, password);
            alert("successfully logged in")
        } catch (error) {
            console.error("Sign-in error:", error.message);
            alert("Sign-in unsuccessful. Please check your email and password.");
        }

    }

    return (

        <div >
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
            <div class="container">
                <div class="left leftlogin">
                    <h1 className="drd">Diabetic Retinopathy <strong className="detec">Detection</strong></h1>
                    <br />
                    <h4>
                        Login using your lab credentials
                    </h4>
                    <br />
                    <form onSubmit={onSubmit}>
                        <input placeholder='email' type="email" className="form-control" id="email" name="email"
                            required onChange={(e) => { setEmail(e.target.value) }} />
                        <input placeholder='password' type="password" className="form-control" id="password"
                            name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                        <button className="btn" type='submit'>
                            Login
                        </button>
                    </form>
                    <Link to={'/reset'}> <button className="btn">
                        Forgot password?
                    </button></Link>
                    <br />
                    <Link to={'/register'}> <button className="btn">
                        Create an account?
                    </button></Link>

                </div>
                <img src={abstract} id="abstract" alt="" />
                <div class="right login">
                    <img src={machine} id="machine" alt="" />
                </div>
            </div>


        </div>
    )
}

export default Display