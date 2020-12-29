import React, { useState, useContext } from 'react'
import { Context } from '../Provider/provider'
import { useHistory } from 'react-router-dom'
const NewPostComp = () => {
    const history = useHistory();
    const { newPost }  = useContext(Context);
    const [text, setText] = useState('');
    const [file, setFile] = useState([]);
    const post = () => {
        console.log(file);
        if (file.length !== 0 || text !== '') {
            var type = 'img';
            if (file.length === 0) {
                type = 'text';
            }
            let s = newPost(file, text, type);
            s.then((r) => {
                if (r === 'done') {
                    history.push('/home');
                    if (type == 'img') {
                        window.location.reload();
                    }
                }else {
                    alert(r);
                }
            })
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <input className='input' type="text" onChange={(e) => setText(e.target.value)} style={{height: '30px', width: '200px'}}/>
            <div className='btn'>
                <p>CHOOSE IMAGE</p>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={{width: '144px', height: '40px', borderRadius: '10px', opacity: '0.0', filter: 'alpha(opacity=0)', MozOpacity: '0.0', khtmlOpacity: '0.0', position: 'absolute'}}/>
            </div>
            <div onClick={post} className='btn'>
                <p>POST</p>
            </div>
        </div>
    );
}
export { NewPostComp }