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
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginLabel, setLoginLabel] = useState('Log In');
    const [logout, setLogout] = useState(false);
    const [createNew, setCreateNew] = useState(false);

    let message;

    useEffect( () => {
        function fetchData() {
            return fetch(`/login/<${textFieldValue}>`)
                .then(response => response.json())
                .then(data => setResponseData(data))
                // .then(data => window.alert(`This would be a Flask Call sending: ${textFieldValue} as the user.`))
                .catch(error => window.alert(error));
        }

        if(clicked) {
            message = fetchData();
            setClicked(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
        }
        if(logout){
            setLogout(false);
            setLoginLabel('Log In');
            setLoginStatus(false);
            setTextFieldValue('');
        }
        if(createNew) {
            window.alert("Created New Account.")
            message = fetchData();
            setClicked(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
            setCreateNew(false);
        }

    }, [clicked, textFieldValue, logout, createNew]);

    return (
        <div className={"login"}>
<<<<<<< Updated upstream
            <h1 className={"loginHeader"}>LOG IN</h1>
            <span><TextField value={textFieldValue} onChange={(e) => setTextFieldValue(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
            <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
            <span><Button onClick={() => setClicked(true)} variant="contained" size={'small'}>Log In</Button></span>
=======
            <h1 className={"loginHeader"}>{loginLabel}</h1>
>>>>>>> Stashed changes

            { loginStatus ? (
                <div>
                    <div>{textFieldValue}</div>
                    <span><Button onClick={() => setLogout(true)} variant="contained" size={'small'}>Log Out</Button></span>
                </div>
            ):(
                <div className={"login"}>
                    <span><TextField value={textFieldValue} onChange={(e) => setTextFieldValue(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
                    <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
                    <span><Button onClick={() => setClicked(true)} variant="contained" size={'small'}>Log In</Button></span>
                    <span>or</span>
                    <span><Button onClick={() => setCreateNew(true)} variant="contained" size={'small'}>Create Account</Button></span>
                </div>
            )}

            {/*{responseData && (*/}
            {/*    <div>*/}
            {/*        <p>Response data:</p>*/}
            {/*        <pre>{JSON.stringify(responseData, null, 2)}</pre>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

<<<<<<< Updated upstream
=======
class CreateProject extends  React.Component {

    state = { name: '', description: ''};

    handleProjectName = (event) => {
        this.setState( { name: event.target.value })
    };

    handleProjectDescription = (event) => {
        this.setState({description: event.target.value})
    };

    handleCreateProject = () => {
        window.alert(`You have created Project: ${this.state.name} with Description: ${this.state.description}`)
        this.setState({name:'', description: ''})
    };

    render() {
         return(
            <div className={"Collection"}>
                <h1><strong>{this.props.text}</strong></h1>
                <div className={"doc"}>
                    <span><TextField value={this.state.name} onChange={this.handleProjectName} id="outlined-basic" label="Enter Name" variant="outlined" size={'small'} /></span>
                    <span><TextField value={this.state.description} onChange={this.handleProjectDescription} id="outlined-basic" label="Enter Description" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={this.handleCreateProject}>Create</Button></span>
                </div>
            </div>
        );
    }
}

class ProjectLookup extends  React.Component {

    state = { id: ''};

    handleProjectID = (event) => {
        this.setState( { id: event.target.value })
    };

    handleLookupProject = () => {
        window.alert(`You have joined Project: ${this.state.id}`)
        // this.setState({id:''})
    };

    render() {
         return(
            <div className={"Collection"}>
                <h1><strong>{this.props.text}</strong></h1>
                <div className={"doc"}>
                    <span><TextField value={this.state.id} onChange={this.handleProjectID} id="outlined-basic" label="Enter Name" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={this.handleLookupProject}>Join</Button></span>
                </div>
            </div>
        );
    }
}

>>>>>>> Stashed changes
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

    render() {
        return(
            <div className={"doc"}>
                <span><strong>{this.props.text}</strong></span>
                <span>Project ID: {this.props.id}</span>
                <span>Description: {this.props.description}</span>
                <span><Button variant="contained" size={'small'} onClick={this.handleJoinProject}>Join</Button></span>
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

    render() {
        return(
            <div className={"doc"}>
                <span><strong>{this.props.text}</strong></span>

                <span><strong>Availability:</strong></span>
                <span><strong>Capacity:</strong></span>

                <span><TextField id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                <span><TextField id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                 <span><Button variant="contained" size={'small'}>Check In</Button></span>
                <span><Button variant="contained" size={'small'}>Check Out</Button></span>
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
<<<<<<< Updated upstream
            <Projects text={'All Projects'}/>
            <HWSets text={'Hardware Sets'}/>
=======
            <CreateProject text={'Create a New Project'} />
            <ProjectLookup text={'Join a Project'}/>
            {/*<Projects text={'All Projects'}/>*/}
            <HWSets text={'Available Hardware Sets'}/>
>>>>>>> Stashed changes
            <Footer />
        </div>
    )
}

export default AwesomeApp;