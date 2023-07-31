import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = [
    {id: "0", name: "Axel Wulff Sæther"},
    {id: "1", name: "Torgeir Eriksen"},
    {id: "2", name: "Thormod Krogerud"}
]

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export default userSlice.reducer
