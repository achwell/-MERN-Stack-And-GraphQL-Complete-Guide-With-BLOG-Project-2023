import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit'
import {client} from "../../api/client";
import {apiSlice} from "../../api/apiSlice";

const usersAdapter = createEntityAdapter()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users'
        })
    })
})

export const {useGetUsersQuery} = extendedApiSlice


const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await client.get("/fakeApi/users")
    return response.data
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
})

export default userSlice.reducer

export const selectUsersResult = apiSlice.endpoints.getUsers.select()
const emptyUsers = []
export const selectAllUsers = createSelector(
    selectUsersResult,
    usersResult => usersResult?.data ?? emptyUsers
)
export const selectUserById = createSelector(
    selectAllUsers,
    (state, userId) => userId,
    (users, userId) => users.find(user => user.id === userId)
)
