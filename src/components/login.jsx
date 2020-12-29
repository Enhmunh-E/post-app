import React, { useState, useContext } from 'react'
import { Context } from '../Provider/provider'
import { useHistory } from 'react-router-dom';
const LoginComp = () => {
    const history = useHistory();
    const { Login } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const lgin = () => {
        let er = Login(email, password);
        er.then((r) => {
            if (r === "No Problem") {
                history.push('/home');
            }else {
                alert(r);
            }
        })
    }
    return(
        <div style={{margin: '10px'}}>
            <div>
                <p>Email:</p>
                <input type='text' onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <p>Password:</p>
                <input type='password' onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button onClick={lgin}>Login</button>
        </div>
    );
}
export { LoginComp }