import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { PostItem } from './postItem'
const Post = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection('/Posts').onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {return doc.data()})
          setPosts([...data]);
        //   console.log(data);
        })
    }, [])
    return (
        <div>
            {
                posts.map((post, index) => {
                    return <PostItem type={post.type} text={post.text} time={post.time} user={post.user} like={post.like} index={index}/>
                })
            }
        </div>
    );
}
export { Post }