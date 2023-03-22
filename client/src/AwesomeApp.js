import React from "react";
import logo from './logo.svg';
import './App.css';
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";

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

class Login extends React.Component {
    render() {
        return (
            <div className={"login"}>
                <h1 className={"loginHeader"}>LOG IN</h1>
                <span><TextField id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
                <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
                <span><Button variant="contained" size={'small'}>Log In</Button></span>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <p>&copy; 2023 GreasyDecember, Inc. - All Rights Reserved.</p>
            </footer>
        )
    }
}

function AwesomeApp(){
    return (
        <div className={"App"}>
            <Header />
            <Login />
            <Footer />
        </div>
    )
}

export default AwesomeApp;