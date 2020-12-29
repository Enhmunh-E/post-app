import React, { useContext } from 'react'
import { Context } from '../Provider/provider'
import { useHistory } from 'react-router-dom' 
const LogOutComp = () => {
    const history = useHistory();
    const { LogOut } = useContext(Context);
    const lgout = () => {
        LogOut();
        history.push('/')
    }
    return (
        <div className='btn' onClick={lgout} style={{height: '30px', width: '70px'}}>LogOut</div>
    );
}
export { LogOutComp }