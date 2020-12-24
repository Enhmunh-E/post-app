import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { PostItem } from './postItem'
import { useHistory } from 'react-router-dom'
const Post = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection('/Posts').onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {return doc.data()})
          setPosts([...data]);
        //   console.log(data);
        })
    }, [db])
    return (
        <div>
            <button onClick={() => history.push('/newpost')}>New Post</button>
            {
                posts.map((post, index) => {
                    return <PostItem type={post.type} text={post.text} time={post.time} user={post.user} like={post.like} index={index} key={index}/>
                })
            }
        </div>
    );
}
export { Post }