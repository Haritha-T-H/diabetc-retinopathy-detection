import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doResetPassword, doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context'
import '../home.css'
import abstract from '../assets/abstract.png'
import machine from '../assets/machine.jpg'

const ResetPassword = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await doResetPassword(email);
            alert("If you are a user, you will reset a password reset link")
        } catch (error) {
            console.error("Sign-in error:", error.message);
            alert(error)

            alert("Password reset unsuccessful.");
        }

    }

    return (

        <div >
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div class="container">
                <div class="left loginleft">
                    <h1 className="drd">Password <strong className="detec">Reset</strong></h1>
                    <br />
                    <h4>
                        Enter your mail id and we will send you a password reset link through mail if you have an account with us.
                    </h4>
                    <br />

                    <form onSubmit={onSubmit}>
                        <input placeholder='email' type="email" className="form-control" id="email" name="email"
                            required onChange={(e) => { setEmail(e.target.value) }} />

                        <button className="btn" type='submit'>
                            ResetPassword
                        </button>
                    </form>


                    <Link to={'/home'}> <button className="btn">
                        Go back
                    </button></Link>

                </div>
                <img src={abstract} id="abstract" alt="" />
                <div class="right ResetPassword">
                    <img src={machine} id="machine" alt="" />
                </div>
            </div>


        </div>
    )
}

export default ResetPassword