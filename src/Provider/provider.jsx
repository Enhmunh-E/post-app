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
    newPost: () => {},
    likeplus: () => {},
})
export const Provider = ({children}) => {
    const [likeItem, setLikeItem] = useState([]);
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
    const newPost = async (file, text) => {
        var r = 'upload done';
        let sec = Date.now();
        if (file !== null && file !== undefined && file.length !== 0) {
            var storageRef = storage.ref();
            var uploadImg = await storageRef.child(`img-storage/${sec}.png`);
            await uploadImg.put(file).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    uploadText(text, sec, url);
                })
            })
        }else {
            uploadText(text, sec, '');
        }   
        return r;
    }
    const uploadText = async (text, sec, url) => {
        var r = 'upload done';
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        await db.collection("Posts").doc(`${sec}`).set({
            like: 0,
            text: text,
            sec: sec,
            date: mm+'/'+dd+'/'+yyyy,
            hour: today.getHours(),
            minutes: today.getMinutes(),
            user: userName,
            imgname: url,
            likedpersons: [],
        })
    }
    const likeplus = (sec) => {
        db.collection('Posts').doc(`${sec}`).get()
        .then(snapshot => {
            var like = snapshot.data().like, likedpersons = [...snapshot.data().likedpersons];
            if (likedpersons.includes(user.email)) {
                var filtered = likedpersons.filter((value) => { 
                    return value !== user.email;
                });
                db.collection("Posts").doc(`${sec}`).update({like: like - 1, likedpersons: filtered});
            }else {
                likedpersons.push(user.email);
                db.collection("Posts").doc(`${sec}`).update({like: like + 1, likedpersons: likedpersons});
            }
        });
    }
    return(
        <Context.Provider value={{ user, userName, Login, SignUp, LogOut, newPost, likeplus }}>
            {children}
        </Context.Provider>
    )
}