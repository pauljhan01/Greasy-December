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
            <h1 className={"loginHeader"}>{loginLabel}</h1>

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

function CreateProject() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createProject, setCreateProject] = useState(false);
    const [responseData, setResponseData] = useState(null);

    let message;

    useEffect( () => {

        function fetchData() {
            return fetch(`/createProject/<${name}>*<${description}>`)
                .then(response => response.json())
                .then(data => setResponseData(data))
                .catch(error => window.alert(error));
        }

        if(createProject){
            message = fetchData();
            setCreateProject(false);
            setName('');
            setDescription('');
            // window.alert(`You have created Project: ${name} with Description: ${description}`)
        }
    }, [createProject]);

    return(
        <div className={"Collection"}>
            <h1><strong>Create Project</strong></h1>
            <div className={"doc"}>
                <span><TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Enter Name" variant="outlined" size={'small'} /></span>
                <span><TextField value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Enter Description" variant="outlined" size={'small'} /></span>
                <span><Button variant="contained" size={'small'} onClick={() => setCreateProject(true)}>Create</Button></span>
               {responseData && (
                    <div>
                        <p>Response:</p>
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
            </div>

        </div>
    );

}

function JoinProject() {

    const [btnClick, setBtnClick] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [id, setId] = useState(null);

    let message;

    useEffect( () => {

            function fetchData() {
                return fetch(`/joinProject/<${id}>`)
                    .then(response => response.json())
                    .then(data => setResponseData(data))
                    .catch(error => window.alert(error));
            }


        if(btnClick){
            message = fetchData();
            setBtnClick(false);
            window.alert(`You have joined Project: ${id}`)
        }
    },[btnClick]);

    return(
        <div className={"Collection"}>
            <h1><strong>Join Project</strong></h1>
            <div className={"doc"}>
                <span><TextField value={id} onChange={(e) => setId(e.target.value)} id="outlined-basic" label="Enter Name" variant="outlined" size={'small'} /></span>
                <span><Button variant="contained" size={'small'} onClick={() => setBtnClick(true)}>Join</Button></span>
            </div>
        </div>
    );

}

function Projects () {
    const components = [];

    for (let i = 1; i < 4; i++) {
        // components.push(Docs(`Project ${i}`));
    }

    return (
        <projects>
            <div className={"collection"}>
                <div>
                    <h1>Projects</h1>
                    {/*<div>{Docs()}</div>*/}
                    {components}
                </div>
            </div>
        </projects>
    );
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
            <CreateProject />
            <JoinProject />

            {/*<Projects text={'Your Projects'}/>*/}
            {/*<HWSets text={'Available Hardware Sets'}/>*/}
            <Footer />
        </div>
    )
}

export default AwesomeApp;