import React from 'react';;
const PostItem = ({ type, text, time, user, like }) => {
    if (type == 'text') {
        return (
            <div className='post'>
                <div>
                    <div>{user}</div>
                    <div>{time}</div>
                </div>
                <div>
                    {text}
                </div>
                <div>
                    <p>{like}</p>
                </div>
            </div>

        );
    }else {
        return (
            <>
            </>
        );
    }
}
export { PostItem }