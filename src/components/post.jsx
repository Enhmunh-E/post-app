import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { PostItem } from './postItem'
import { useHistory } from 'react-router-dom'
const Post = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection('/Posts').orderBy('sec', 'desc').onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {return doc.data()})
          setPosts([...data]);
        })
    }, [db])
    return (
        <div>
            <div onClick={() => history.push('/newpost')} className='btn'>New Post +</div>
            {
                posts.map((post, index) => {
                    return <PostItem like={post.like} text={post.text} sec={post.sec} hour={post.hour} minutes={post.minutes} date={post.date} user={post.user} imgname={post.imgname}  index={index} key={index}/>
                })
            }
        </div>
    );
}
export { Post }