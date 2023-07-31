import React from "react";
import { useDispatch } from 'react-redux'
import {reactionAdded} from "./postsSlice"

const reactionEmoji = {
    thumbsUp:'👍',
    raisingHands: '🙌🏻 ',
    heart:'🧡',
    rocket:'🚀',
    eyes: '👀'
}

export const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([reactionName, emoji]) => {
        return (
            <button
                key={reactionName}
                type="button"
                className='muted-button reaction-button'
                onClick={() => dispatch(reactionAdded({postId: post.id, reaction: reactionName}))}
            >
                {emoji} {post.reactions[reactionName]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}
