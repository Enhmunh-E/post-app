import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
export const Context = createContext({
    user: null,
    setUser: () => {},
    Login: () => {},
    SignUp: () => {},
    LogOut: () => {},
})
export const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    var userData = auth.currentUser;
    // console.log(userData);
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
            })
            .catch((error) => {
                alert(error.message);
            });
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
    }
    return(
        <Context.Provider value={{ user, Login, SignUp, LogOut }}>
            {children}
        </Context.Provider>
    )
}