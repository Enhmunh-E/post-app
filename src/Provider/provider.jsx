import React, { createContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../firebase'
// import { useHistory } from 'react-router-dom'
export const Context = createContext({
    user: null,
    userName: '',
    setUser: () => {},
    Login: () => {},
    SignUp: () => {},
    LogOut: () => {},
    newPost: () => {}
})
export const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    // var userData = auth.currentUser;
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) { 
                    // console.log(user.email);
                    searchUserName(user.email);
                    setUser(user);
                } else {
                    setUser(null);
                }
            });
        }
    }, [auth])
    const Login = async (email, password) => {
        let r = "No Problem";
        if (!user) {
            await auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                searchUserName(user);
                setUser(user);
            })
            .catch((error) => {
                r = error.message;
                // console.log(error)
            });
        }
        return r;
    }
    const SignUp = async (email, password, username) => {
        let r = "No Problem";
        await auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
            setUserName(username);
            addUserName(username, email);   
        })
        .catch((error) => {
            r = error.message;
        });
        return r;
    } 
    const LogOut = () => {
        auth.signOut().then(() => {
            setUser(null);
        }).catch((error) => {
            console.log(error.message);
            // alert(error.message);
        })
    }
    const addUserName = (name, email) => {
        console.log(name, email,'addusername');
        db.collection('accs').add({
            name: name,
            email: email,
        });
    }
    const searchUserName = (email) => {
        db.collection('accs').onSnapshot(snapshot => {
            const data = snapshot.docs.map((doc) => {return doc.data()})
            data.forEach((dt) => {
                // console.log(dt.email, email);
                if (dt.email === email) {
                    setUserName(dt.name);
                }
            })
        })
    }
    const newPost = async (file, text, type) => {
        let done = 'done';
        if (type === 'img') {
            let r = uploadImg(file);
            r.then((r) => {
                if (r !== 'upload done') {
                    alert(r);
                    done = r;
                }
            })
        }
        let r = uploadText(text, type);
        r.then((rt) => {
            if (rt !== 'upload done') {
                done = rt;
            }
        })
        return done;
    }
    const uploadImg = async (file) => {
        var r = 'upload done';
        var storageRef = storage.ref();
        var uploadImg = storageRef.child(`img-storage/${file.name}`).put(file);
        await uploadImg.on('state_changed', (snapshot) => {
        }, function(error) {
            // alert(error.message);
            r = error.message;
        }, function() {
            // console.log('upload done');
        });
        return r;
    }
    const uploadText = async (text, type) => {
        var r = 'upload done';
        await db.collection("Posts").add({
            like: 0,
            text: text,
            time: new Date(),
            type: type,
            user: userName
        })
        .then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            r = error.message;
            // console.l(error);
        });
        return r;
    }
    return(
        <Context.Provider value={{ user, userName, Login, SignUp, LogOut, newPost }}>
            {children}
        </Context.Provider>
    )
}