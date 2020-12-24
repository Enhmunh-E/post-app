import React, { useState, useContext } from 'react'
import { Context } from '../Provider/provider'
import { useHistory } from 'react-router-dom'
const NewPostComp = () => {
    const history = useHistory();
    const { newPost }  = useContext(Context);
    const [text, setText] = useState('');
    const [file, setFile] = useState([]);
    const post = () => {
        let s = newPost(file, text, tp(file));
        s.then((r) => {
            if (r === 'done') {
                history.push('/home');
            }else {
                alert(r);
            }
        })
    }
    const tp = (file) => {
        let r = '';
        if (file === []) {
            r = 'text';
        }else {
            r = 'img';
        }
        return r;
    }
    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)}/>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={post}>Post</button>
        </div>
    );
}
export { NewPostComp }