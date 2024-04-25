import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
import { doSignOut } from '../firebase/auth'
import { useAuth } from '../context'
import eye from '../assets/eye.png'

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
            <div className="logo"><strong className='dblue'> <img className='eyeimg' src={eye} alt="" srcset="" />  Eye</strong><strong className='blue'> Center</strong></div>
            <ul>
                {userLoggedIn && <Link to={'/'}>  <li>
                    <h5><strong>Home</strong></h5>
                </li></Link>}

                {userLoggedIn && <Link to={'/history'}>  <li>
                    <h5><strong>Previous Predictions</strong></h5>
                </li></Link>}

                {userLoggedIn && <h5 onClick={onLogout}><strong className='logout'>Logout</strong></h5>}
            </ul>
        </div>
    )
}

export default Header