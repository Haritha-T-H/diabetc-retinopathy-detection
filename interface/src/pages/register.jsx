import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import '../home.css'
import { db, storage } from "../firebase/firebase";
import eye from '../assets/raw.png'
import { setDoc, doc, serverTimestamp, arrayUnion, Timestamp } from 'firebase/firestore';
import abstract from '../assets/abstract.png'
import machine from '../assets/machine.jpg'

const Register = () => {

    const navigate = useNavigate()
    const { currentUser } = useAuth()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [phone, setPhone] = useState('')
    const [laboratory, setlaboratory] = useState('')
    const { userLoggedIn } = useAuth()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const onSubmit = async (e) => {
        e.preventDefault()
        if (password == cpassword) {
            if (phone.length != 10) {
                try {
                    await doCreateUserWithEmailAndPassword(email, password)
                    const userDocRef = doc(db, "users", email);
                    await setDoc(userDocRef, {
                        laboratory: laboratory,
                        designation: designation,
                        name: name,
                        phone: phone,
                    },);
                    alert("Sign up successful")
                } catch (r) {
                    alert(r)
                }
            } else {
                alert("Phone number should contain 10 digits")
            }
        } else {
            alert("password doesnot match")
        }

    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="container">
                <div class="left leftlogin">

                    <form onSubmit={onSubmit}>
                        <input placeholder='email' type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }}
                            required />
                        <br />

                        <input placeholder='laboratory' type="laboratory" className="form-control" id="laboratory" name="laboratory" value={laboratory} onChange={(e) => { setlaboratory(e.target.value) }}
                            required />
                        <br />

                        <input placeholder='Name' type="text" className="form-control" id="name" name="mame" value={name} onChange={(e) => { setName(e.target.value) }}
                            required />
                        <br />
                        <input placeholder='Designation' type="text" className="form-control" id="designation" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }}
                            required />
                        <br />

                        <input placeholder='password (min 6 characters)' type="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }}
                            name="password" required />
                        <br />
                        <input placeholder='confirm password' type="password" className="form-control" id="password" onChange={(e) => { setCPassword(e.target.value) }}
                            name="password" required data-toggle="password"
                        />
                        <br />
                        <input placeholder='Phone number' type="text" className="form-control" id="phone" onChange={(e) => { setPhone(e.target.value) }}
                            name="password" required />
                        <br />

                        <button className="btn" type='submit'>
                            Sign up
                        </button>
                    </form>
                    <br />



                    <Link to={'/login'}>   <button className="btn">
                        Already have an account?
                    </button></Link>

                </div>
                <img src={abstract} id="abstract" alt="" />
                <div class="right login">
                    <img src={machine} id="machine" alt="" />

                </div>
            </div>



        </>
    )
}

export default Register