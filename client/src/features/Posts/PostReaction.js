import React from 'react'
import { addReaction } from './postslice';
import {useDispatch} from "react-redux";

const PostReaction = ({post}) => {
    const dispatch = useDispatch();
    const emojis = {
        like: '👍',
        thumbsUp: '👍',
        heart:'❤️'
    }
    const reactBtn = Object.entries(emojis).map(([name, emoji]) =>{
        return (
            <button
            key={name}
            type="button"
            className='reactionBtn'
            onclick={()=> dispatch(addReaction({postId:post.id, reaction:name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
  return (
    <div>{reactBtn}</div>
  )
}

export default PostReaction