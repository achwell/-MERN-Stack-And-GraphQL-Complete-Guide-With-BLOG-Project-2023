import {ComponentType} from 'react';
import {Provider} from 'react-redux';
import store from '../store';

import './home.css';

interface AppProps {
    Component: ComponentType<any>;
    pageProps: any;
}

function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default App;
