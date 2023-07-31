import {createSlice, nanoid} from '@reduxjs/toolkit'
import {sub} from "date-fns";

const initialState = [
    {
        id: "1",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        title: "First post!",
        content: "Bitcoin to the moon",
        user: "0",
        reactions: {
            thumbsUp: 0,
            raisingHands: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        }
    },
    {
        id: "2",
        date: sub(new Date(), {minutes: 5}).toISOString(),
        title: "Second post!",
        content: "Kale is healthy",
        user: "1",
        reactions: {
            thumbsUp: 0,
            raisingHands: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        }
    }
];
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                postId.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            raisingHands: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        }
                    }
                }
            }
        },
        postUpdated(state, action) {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
    }
});
console.log({initialState})
export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions
export default postsSlice.reducer;
