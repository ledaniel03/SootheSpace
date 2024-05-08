// import React from 'react'
import { logoutUserDB } from '../utils/db'
import { useLocation } from 'wouter'

const LogoutButton = () => {
    const [, navigate] = useLocation()
    const handleLogout = async () => {
        const [res, state] = await logoutUserDB()
        if (res && state) {
            navigate('/login')
        }
    }
    return (
        <div className='fixed top-2 right-2'>
            <button className='bg-teal-500 py-1 px-2 rounded-md font-medium text-white'
                onClick={handleLogout} >
                Logout</button>
        </div>
    )
}

export default LogoutButton