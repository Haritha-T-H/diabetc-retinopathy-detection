import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
const Header = () => {
    const navigate = useNavigate()
    return (
        <div class='navcontainer'>
            <div class="logo">Diabetic Retinopathy Detection</div>
            <ul>
                <li>Home</li>
                <li>History</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default Header