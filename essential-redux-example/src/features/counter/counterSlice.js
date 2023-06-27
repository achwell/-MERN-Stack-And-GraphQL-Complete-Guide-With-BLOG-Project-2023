import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCount} from "./counterAPI"

const initialState = {
    numberValue: 0,
    status: 'idle'
}

export const incrementAsync  =createAsyncThunk(
    "counter/fetchCount",
    async (amount) => {
        const response = await fetchCount(amount)
        return response.data
    }
)

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.numberValue += 1
        },
        decrement: (state) => {
            state.numberValue -= 1
        },
        incrementByAmount: (state, action) => {
            state.numberValue += action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.numberValue += action.payload
        })
        builder.addCase(incrementAsync.rejected, (state, action) => {
            state.status = "rejected"
        })
    }
})
export const {increment, decrement, incrementByAmount} = counterSlice.actions
export const selectCount = state => state.counter.numberValue
export const selectFetchStatus = state => state.counter.status
export default counterSlice.reducer
