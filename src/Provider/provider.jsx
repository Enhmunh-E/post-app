import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useHistory } from 'react-router-dom'
export const Context = createContext({
    user: null,
    userName: '',
    setUser: () => {},
    Login: () => {},
    SignUp: () => {},
    LogOut: () => {},
})
export const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
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
                searchUserName(email);
                setUser(user);
            })
            .catch((error) => {
                console.log(error)
                // alert(error.message);
            });
        }
    }
    const SignUp = (email, password, username) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
            addUserName(username, email);
        })
        .catch((error) => {
            console.log(email);
            console.log(error);
            // alert(error.message);
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
    const addUserName = (name, email) => {
        console.log(name, email,'addusername');
        db.collection('/accs').add({
            name: name,
            email: email,
        });
    }
    const searchUserName = (email) => {
        db.collection('/accs').onSnapshot(snapshot => {
            const data = snapshot.docs.map((doc) => {return doc.data()})
            data.forEach((dt) => {
                console.log(dt.email, email);
                if (dt.email === email) {
                    setUserName(dt.name);
                }
            })
        })
    }
    return(
        <Context.Provider value={{ user, userName, Login, SignUp, LogOut }}>
            {children}
        </Context.Provider>
    )
}