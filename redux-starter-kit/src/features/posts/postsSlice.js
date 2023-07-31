import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import {client} from "../../api/client";

const initialState = {
    posts: [],
    status: "idle",
    error: null
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await client.get("/fakeApi/posts")
    return response.data
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async initialPost => {
    const response = await client.post("/fakeApi/posts", initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                postId.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
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
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeded"
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewPost.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = "succeded"
                state.posts = state.posts.push(action.payload)
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
});
console.log({initialState})
export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export const selectAllPosts = state => state.posts.posts
export const selectPostsById = (state, postId) => state.posts.posts.find(post => post.id === postId)
export default postsSlice.reducer;
