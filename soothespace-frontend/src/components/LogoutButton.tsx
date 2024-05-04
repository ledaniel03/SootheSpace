import React from 'react'
import { logoutUserDB } from '../utils/db'

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUserDB()
    }
    return (
        <div className='fixed top-2 right-2'>
            <button className='bg-green-400 py-1 px-2 rounded-md font-bold text-white'
                onClick={handleLogout} >
                LogOut</button>
        </div>
    )
}

export default LogoutButton