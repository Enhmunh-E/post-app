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
            if (r === "No Problem") {
                history.push('/home')
            }else {
                alert(r);
            }
        })            
    }
    return (
        <div style={{margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div>
                <p>Email:</p>
                <input type='email' onChange={(e) => setEmail(e.target.value)} required  style={{height: '30px', width: '200px'}} className='input'/>
            </div>
            <div>
                <p>Username:</p>
                <input type='text' onChange={(e) => setName(e.target.value)} required  style={{height: '30px', width: '200px'}} className='input'/>
            </div>
            <div>
                <p>Password:</p>
                <input type='password' onChange={(e) => setPassword(e.target.value)} required  style={{height: '30px', width: '200px'}} className='input'/>
            </div>
            <div className='btn' onClick={sgnup}>Sign Up</div>
        </div>
    );
}
export { SignUpComp }