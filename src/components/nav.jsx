import React, { useContext } from 'react'
import { Context } from '../Provider/provider'
import { LogOutComp } from './logout'
const Nav = () => {
    const { userName } = useContext(Context);
    return (
        <div>
            {userName}
            <LogOutComp/>
        </div>
    );
}
export { Nav }