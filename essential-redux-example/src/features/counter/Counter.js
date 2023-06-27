import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementAsync, incrementByAmount, selectCount, selectFetchStatus} from "./counterSlice";
import {useState} from "react";

export function Counter() {
    const count = useSelector(selectCount)
    const fetchStatus = useSelector(selectFetchStatus)
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState("2")

    const incrementValue = Number(incrementAmount) || 0

    return (
        <div>
            <span>{fetchStatus === "idle" ? count : fetchStatus}</span>
            <button onClick={() => {
                dispatch(decrement())
            }}>-
            </button>
            <span>{count}</span>
            <button onClick={() => {
                dispatch(increment())
            }}>+
            </button>
            <input aria-label="Set Increment Amount" type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}/>
            <button onClick={() => {
                dispatch(incrementByAmount(incrementValue))
            }}>Add Amount ({incrementValue})
            </button>
            <button onClick={() => dispatch(incrementAsync(incrementValue))}>
                Add Async Amount ({incrementValue})
            </button>
        </div>
    )
}
