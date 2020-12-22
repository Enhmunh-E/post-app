import React, { useState, useContext } from 'react'
import { Context } from '../Provider/provider'
const LoginComp = () => {
    const { Login } = useContext(Context);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    return(
        <div>
            <div>
                <p>Username:</p>
                <input type='text' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <p>Password:</p>
                <input type='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={() => Login(name, password)}>Login</button>
        </div>
    );
}
export { LoginComp }