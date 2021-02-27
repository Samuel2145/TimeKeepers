import logo from './logo.svg';
import gatoricon from './img/gatoricon';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={gatoricon} className="App-logo" alt="logo"/>
                <p>
                    Schedugator.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
