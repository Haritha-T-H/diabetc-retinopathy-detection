import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import '../home.css'
import eye from '../assets/raw.png'
const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div className='pagecontainer'>
                <div className="bgcontainer">
                    <div className="box">
                        <div className="formcontainer">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <input placeholder='email' type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <input placeholder='username' type="text" className="form-control" id="email" name="email" value={name} onChange={(e) => { setName(e.target.value) }}
                                        required />
                                </div>

                                <div className="mb-3">

                                    <input placeholder='password' type="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }}
                                        name="password" required />
                                </div>

                                <div className='links'>
                                    <button type="submit" className="btn btn-primary">
                                        signup
                                    </button>
                                    <Link to={'/login'}>   <button className="btn btn-success">
                                        Already have an account?😁
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
        </>
    )
}

export default Register