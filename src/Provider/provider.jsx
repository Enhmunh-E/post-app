import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
export const Context = createContext({
    user: null,
    setUser: () => {},
    Login: () => {},
    SignUp: () => {},
    LogOut: () => {},
})
export const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const history = useHistory();
    var userData = auth.currentUser;
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            });
        }
    }, [auth])
    const Login = (email, password) => {
        if (!user) {
            auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUser(user);
                history.push('/home');
            })
            .catch((error) => {
                alert(error.message);
            });
            history.push('/home')
        }
    }
    const SignUp = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
        })
        .catch((error) => {
            alert(error.message);
        });
    } 
    const LogOut = () => {
        console.log('LogOut');
        auth.signOut().then(() => {
            setUser(null);
        }).catch((error) => {
            alert(error.message);
        })
        console.log(user);
    }
    return(
        <Context.Provider value={{ user, Login, SignUp, LogOut }}>
            {children}
        </Context.Provider>
    )
}