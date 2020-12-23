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
        if (email !== '' && name !== '' && password !== '') {
            let er = SignUp(email, password, name);
            console.log(er)
            if (er == '1') {
                history.push('/home')
            }else {
                alert(er);
            }
        }
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