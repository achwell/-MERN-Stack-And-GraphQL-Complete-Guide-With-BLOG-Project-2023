import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"
import store from "./app/store"
import {Provider} from "react-redux"
import {extendedApiSlice} from "./features/users/usersSlice"

import {worker} from "./api/server"
import "./index.css"

// Wrap app rendering, so we can wait for the mock API to initialize
async function start() {
    const container = document.getElementById("root");
    const root = createRoot(container);
    // Start our mock API server
    await worker.start({onUnhandledRequest: "bypass"})

    store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    )
}

start()
