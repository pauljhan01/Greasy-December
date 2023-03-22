import React from "react";
import logo from './logo.svg';
import './App.css';

class Header extends React.Component {
        render(){
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <h1>This is AWESOME App</h1>
                    <p>We manage your projects so you don't have to...because we're AWESOME.</p>
                </div>
            </header>
        );
    }
}

function AwesomeApp(){
    return (
        <div className={"App"}>
            <Header />
        </div>
    )
}

export default AwesomeApp;