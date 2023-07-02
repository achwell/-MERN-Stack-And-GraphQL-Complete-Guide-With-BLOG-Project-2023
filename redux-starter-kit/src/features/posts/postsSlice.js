import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {id: "1", title: "First post!", content: "Bitcoin to the moon"},
    {id: "2", title: "Second post!", content: "Kale is healthy"}
];
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
});
console.log({initialState})
export const {postAdded} = postsSlice.actions
export default postsSlice.reducer;
