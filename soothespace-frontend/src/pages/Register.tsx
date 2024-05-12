import { useState } from 'react';
// import axios from 'axios';
import { useLocation } from 'wouter';
import { addUserToDB } from '../utils/db';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [info, setInfo] = useState('');
    const [location, setLocation] = useLocation()

    const handleLogin = async () => {
        if (username.length < 3 || password.length < 3) {
            setInfo("Fill all details")
            return
        }
        if (password != password2) {
            setInfo("Passwords do not match")
            return
        }
        const [status, loginInfo] = await addUserToDB({ username, password })
        if (status && loginInfo) {
            setLocation("/")
        } else {
            setInfo(loginInfo)
        }
    };

    return (
        <div className="flex flex-col max-w-[60%] items-center mx-auto my-[20%] gap-4 [&>*]:px-4 [&>input]:text-xl  " >
            <h2 className='text-white font-bold underline mb-2 text-xl ' >Signup from Soothespace</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Password again... "
            />
            <button className='text' onClick={e=>setLocation('/login')} >login instead?</button>
            <div className='text-red-500' >{info}</div>
            <button onClick={handleLogin} className='bg-blue-500 w-fit ' >Signup</button>
        </div>
    );
}

export default Login;
