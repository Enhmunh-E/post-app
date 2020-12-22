import React, { useState, useEffect, useContext } from 'react'
import { firebase, db, storage } from '../firebase'
import { Context } from '../Provider/provider'
const LoginComp = () => {
    const { user, Login } = useContext(Context);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const Check = () => {
        Login(name, password);
    }
    return(
        <div style={{display: `${user ? 'block': 'none'}`}}>
            <div>
                <p>Username:</p>
                <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div>
                <p>Password:</p>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button onClick={() => Check()}>Login</button>
        </div>
    );
}
export { LoginComp }