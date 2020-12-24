import React, { useContext, useState } from 'react'
import { Context } from '../Provider/provider'
import { useHistory } from 'react-router-dom'
const SignUpComp = () => {
    const history = useHistory();
    const { SignUp } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sgnup = () => {
        let er = SignUp(email, password, name);    
        er.then((r) => {
            console.log(r);
            if (r === "No Problem") {
                history.push('/home')
            }else {
                alert(r);
            }
        })            
    }
    return (
        <div style={{margin: '10px'}}>
            <div>
                <p>Email:</p>
                <input type='email' onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <p>Username:</p>
                <input type='text' onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div>
                <p>Password:</p>
                <input type='password' onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button onClick={sgnup}>Sign Up</button>
        </div>
    );
}
export { SignUpComp }