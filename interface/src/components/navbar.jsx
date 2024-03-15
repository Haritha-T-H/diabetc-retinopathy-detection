import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
import { doSignOut } from '../firebase/auth'
import { useAuth } from '../context'

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { userLoggedIn } = useAuth()


    const onLogout = async (e) => {
        e.preventDefault()
        await doSignOut();
    }

    return (
        <div className='navcontainer'>
            <div className="logo">Diabetic Retinopathy Detection</div>
            <ul>
                <Link to={'/'}>  <li>
                    <h5>Home</h5>
                </li></Link>

                <Link to={'/history'}>  <li>
                    <h5>History</h5>
                </li></Link>

                {userLoggedIn && <li onClick={onLogout}>Logout</li>}
            </ul>
        </div>
    )
}

export default Header