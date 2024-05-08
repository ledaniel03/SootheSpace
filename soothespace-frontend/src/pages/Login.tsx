import { useState } from 'react';
// mport axios from 'axios';
import { loginUserDB } from '../utils/db';
import { useLocation } from 'wouter';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [location, setLocation] = useLocation()

    const handleLogin = async () => {
        if (username.length < 3 || password.length < 3) {
            setInfo("Fill all details")
            return
        }
        const [status, loginInfo] = await loginUserDB({ username, password })
        if (status && loginInfo ) {
            setLocation("/")
        } else {
            setInfo(loginInfo)
        }
    };

    return (
        <div className="flex flex-col max-w-[60%] items-center mx-auto my-[20%] gap-4 [&>*]:px-4 [&>*]:text-xl  " >
            <h2 className='text-white font-bold underline mb-2 ' >Login to Soothespace</h2>
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
            <a className='text' href='/register' >signup instead?</a>
            <div className='text-red-500' >{info}</div>
            <button onClick={handleLogin} className='bg-blue-500 w-fit ' >Login</button>
        </div>
    );
}

export default Login;
