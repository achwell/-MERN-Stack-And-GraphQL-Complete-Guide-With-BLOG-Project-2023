import './App.css';
import {Counter} from "./features/counter/Counter";

function App() {
    return (
        <div className="App">
            <header>
                <h1>Counter Redux Example</h1>
            </header>
            <Counter/>
        </div>
    );
}

export default App;
