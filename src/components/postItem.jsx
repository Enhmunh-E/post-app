import React, { useState, useContext } from 'react'
import { storage } from '../firebase'
import { Context } from '../Provider/provider';
const PostItem = ({ like, text, sec, hour, minutes, date, user, imgname, index }) => {
    const [url, setUrl] = useState('');
    const { likeplus } = useContext(Context);
    if (imgname !== '') {
        var itemRef = storage.ref().child(`img-storage/${sec}.png`);
        itemRef.getDownloadURL().then(function(downloadURL) {
            setUrl(downloadURL);
        });
    }
    var min = minutes;
    if (minutes < 10) {
        min = '0' + minutes;
    }
    var hr = hour;
    if (hr < 10) {
        hr = '0'+hr;
    }
    if (imgname === '') {
        return (
            <div className='post'>
                {/* {index+'.'} */}
                <div>
                    <div>{user}</div>
                    <p>{date}</p>
                    <p>{hr}:{min}</p>
                </div>
                <div>
                    {/* {text ? 'text:': ''}{text} */}
                    {text}
                </div>
                <div className='p-btm'>
                    <p>like: {like}</p>
                    <div onClick={() => likeplus(sec)} className='btn' style={{width: '50px', height: '20px'}}>Like</div>
                </div>
            </div>

        );
    }else {
        return (
            <div className='post'>
                <div>
                    <div>{user}</div>
                    <p>date: {date}</p>
                    <p>{hr}:{min}</p>
                </div>
                <div>
                    {/* {text ? 'text:': ''}{text} */}
                    {text}
                </div>
                <div>
                    <img src={url} width='350px' alt={sec+'.png'}/>
                </div>
                <div className='p-btm'>
                    <p>like: {like}</p>
                    <div onClick={() => likeplus(sec)} className='btn' style={{width: '50px', height: '20px'}}>Like</div>
                </div>
            </div>
        );
    }
}
export { PostItem }