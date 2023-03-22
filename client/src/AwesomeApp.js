import React from "react";
import logo from './logo.svg';
import './App.css';
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

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

function Login() {
    const [clicked, setClicked] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [responseData, setResponseData] = useState(null);

    useEffect( () => {
        function fetchData() {
            return fetch(`/login/<${textFieldValue}>`)
                .then(response => response.json())
                .then(data => setResponseData(data))
                .then(data => window.alert(`This would be a Flask Call sending: ${textFieldValue} as the user.`))
                .catch(error => window.alert(error));
        }

        if(clicked) {
            fetchData();
            setClicked(false);
            setTextFieldValue('');
        }

    }, [clicked, textFieldValue]);

    return (
        <div className={"login"}>
            <h1 className={"loginHeader"}>LOG IN</h1>
            <span><TextField value={textFieldValue} onChange={(e) => setTextFieldValue(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
            <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
            <span><Button onClick={() => setClicked(true)} variant="contained" size={'small'}>Log In</Button></span>

            {responseData && (
                <div>
                    <p>Response data:</p>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

class Projects extends React.Component {

    render(){

        const components=[];

        for(let i = 1; i < 3; i++){
            components.push(<ProjectDocs text={`Project ${i}`} description={`Project ${i} description.`} id={`${i}`}/>);
        }

        return(
          <div className={"Collection"}>
              <h1>{this.props.text}</h1>
              {components}
          </div>
        );
    }
}

class ProjectDocs extends React.Component {

    handleJoinProject = () => {
        window.alert(`You have joined Project ${this.props.id}`);
    }

    handleLeaveProject = () => {
        window.alert(`You have left Project ${this.props.id}`);
    }

    render() {
        return(
            <div className={"doc"}>
                <span><strong>{this.props.text}</strong></span>
                <span>Project ID: {this.props.id}</span>
                <span>Description: {this.props.description}</span>
                <span><Button variant="contained" size={'small'} onClick={this.handleJoinProject}>Join</Button></span>
                <span><Button variant="contained" size={'small'} onClick={this.handleLeaveProject}>Leave</Button></span>
            </div>
        );
    }
}

class HWSets extends React.Component {

    render() {

        const components=[];

        for(let i = 1; i < 3; i++){
            components.push(<HWDocs text={`HW Sets ${i}`}/>);
        }

        return(
          <div className={"Collection"}>
              <h1>{this.props.text}</h1>
              {components}
          </div>
        );
    }
}

class HWDocs extends React.Component {

    state = { qty: '', project: '', available: 200, capacity: 200 };

    handleInputText = (event) => this.setState( { qty: event.target.value });

    handleProjectInput = (event) => this.setState({ project: event.target.value })

    handleCheckOut = () => {
        const newAmt = this.state.available - parseInt(this.state.qty, 10);
        const checkedOutAmt = parseInt(this.state.qty, 10);

        if(parseInt(this.state.qty, 10) > this.state.available) {
            this.setState({ qty: '', project:'', available: 0});
            window.alert(`You are attempting to check out too many units! ${this.state.available} units from ${this.props.text} were checked out for ${this.state.project}!`);
        }
        else {
            this.setState({ qty: '', project:'', available: newAmt });
            window.alert(`You have checked out ${checkedOutAmt} units from ${this.props.text} for Project ${this.state.project}.`);
        }
    };

    handleCheckIn = () => {

        const newAmt = this.state.available + parseInt(this.state.qty, 10);
        if(newAmt > this.state.capacity) {
            this.setState({ qty: '', project: '',available: this.state.capacity });
            window.alert(`You are attempting to check in too many units! ${newAmt - this.state.capacity} units from ${this.props.text} where NOT checked in for Project ${this.state.project}!`);
        }
        else {
            this.setState({ qty: '', project: '', available: newAmt });
            window.alert(`You have checked in ${newAmt} units from ${this.props.text} for Project ${this.state.project}!`);
        }
    };

    render() {
        return(
            <div className={"doc"}>
                <span><strong>{this.props.text}</strong></span>

                <span><strong>Availability:</strong> {this.state.available}</span>
                <span><strong>Capacity:</strong> {this.state.capacity}</span>

                <span><TextField value={this.state.qty} onChange={this.handleInputText} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                <span><TextField value={this.state.project} onChange={this.handleProjectInput} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                 <span><Button variant="contained" size={'small'} onClick={this.handleCheckIn}>Check In</Button></span>
                <span><Button variant="contained" size={'small'} onClick={this.handleCheckOut}>Check Out</Button></span>
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
            <Projects text={'All Projects'}/>
            <HWSets text={'Available Hardware Sets'}/>
            <Footer />
        </div>
    )
}

export default AwesomeApp;