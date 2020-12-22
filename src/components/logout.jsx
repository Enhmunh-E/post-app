import React, { useContext } from 'react'
import { firebase, db, storage } from '../firebase'
import { Context } from '../Provider/provider'

const LogOutComp = () => {
    const { LogOut } = useContext(Context);
    return (
        <button onClick={LogOut}>LogOut</button>
    );
}
export { LogOutComp }