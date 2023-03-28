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

function YourProjects() {

    //Response variables
    const [loginMessage, setLoginMessage] = useState(null);
    const [joinMessage, setJoinMessage] = useState(null);
    const [createProjectMessage, setCreateProjectMessage] = useState(null);
    const [showProjectsMessage, setShowProjectsMessage] = useState(null);
    const [checkinMessage, setCheckinMessage] = useState(null);
    const [checkoutMessage, setCheckoutMessage] = useState(null);

    // Login variables
    const [loginLabel, setLoginLabel] = useState('Log In');
    const [loginStatus, setLoginStatus] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [logout, setLogout] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    // join project variables
    const [joinClicked, setJoinClicked] = useState(false);
    const [id, setId] = useState('');

    //create project variables
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [createProject, setCreateProject] = useState(false);

    //show projects variables
    const [showProjects, setShowProjects] = useState(false);
    const [getProjects, setGetProjects] = useState([]);
    const [collection, setCollection] = useState([]);

           //Doc variables
            const [joined, setJoined] = useState(true);
            const [qty1, setQty1] = useState(0);
            const [qty2, setQty2] = useState(0);

            //Hardware set 1 variables
            const [avail1, setAvail1] = useState(200);
            const [cap1, setCap1] = useState(200);

            //Hardware set 2 variables
            const [avail2, setAvail2] = useState(200);
            const [cap2, setCap2] = useState(200);

    useEffect( () => {

        //login hooks
        function fetchLogin() {
            return fetch(`/login/<${username}>/<${password}>`)
                .then(response => response.json())
                .then(data => setLoginMessage(data))
                // .then(data => window.alert(`This would be a Flask Call sending: ${textFieldValue} as the user.`))
                .catch(error => window.alert(error));
        }
        if(login) {
            fetchLogin();
            setLogin(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
            setShowProjects(true);
            fetchShowProjects();
        }
        if(logout){
            setLogout(false);
            setLoginLabel('Log In');
            setLoginStatus(false);
            setUsername('');
            setShowProjects(false);
        }
        if(createAccount) {
            window.alert("Created New Account.")
            fetchLogin();
            setLogin(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
            setCreateAccount(false);
            setShowProjects(false);
        }

        //join project hooks
        function fetchJoin() {
            return fetch(`/joinProject/<${id}>/<${username}>`)
                .then(response => response.json())
                .then(data => setJoinMessage(data))
                .catch(error => window.alert(error));
        }
        if(joinClicked){
            fetchJoin();
            setJoinClicked(false);
            setId('');
            window.alert(`You have joined Project: ${id}`)
        }

        //create project hooks
        function fetchCreateProject() {
            return fetch(`/createProject/<${projectName}>/<${projectDescription}>`)
                .then(response => response.json())
                .then(data => setCreateProjectMessage(data))
                // .then(data => fetchShowProjects())
                .catch(error => window.alert(error));
        }
        if(createProject){
            fetchCreateProject();
            setCreateProject(false);
            setProjectName('');
            setProjectDescription('');
            window.alert(`You have created Project: ${projectName} with Description: ${projectDescription}`)
            // fetchShowProjects();
        }

        //show projects hooks
        function fetchShowProjects(){
            return fetch(`/projects/<${username}>`)
                .then(response => response.json())
                .then(data => setGetProjects(data))
                // .then(data => Projects())
                .catch(error => window.alert(error))
        }
        function Projects(){
            const components = [];

            getProjects.forEach(project => {
                components.push(Docs(project))
            });

            setCollection(components);
        }
        function Docs(project){

            const [amount, setAmount] = useState(0);

            const handleCheckin1 = () => {
                window.alert(`You are checking in to project ${project.name}`);
                // const newAmt = avail1 + qty1;
                //
                // if(newAmt > cap1) {
                //     setAmount(0);
                //     setAvail1(cap1);
                //     window.alert(`You are attempting to check in too many units! ${newAmt - cap1} units from HWSet1 where NOT checked in for Project ${project.name}!`);
                // }
                // else {
                //     setAmount(0);
                //     setAvail1(newAmt);
                //     window.alert(`You have checked in ${amount} units from HWSet1 for Project ${project.name}!`);
                // }
            }

            const handleCheckout = () => {
                window.alert(`You are checking out to project ${project.name}`);
            }

            return(
                <div className={"doc"}>
                    <h2>Project: {project.name}</h2>
                    <div className={"docHeader"}>
                        <strong>Users:</strong> {username} <strong>Description:</strong> {project.description}
                        <span><Button onClick={() => setJoined(true)} variant="contained" size={'small'}>Leave</Button></span>
                    </div>
                    <span className={"hardwareSet"}>
                        <span><strong>HWSet1</strong> </span>
                        <span><strong>Availability: </strong> {avail1} / {cap1} </span>
                        <span><TextField value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                        <span><Button onClick={handleCheckin1} variant="contained" size={'small'}>Check In</Button></span>
                        <span><Button onClick={handleCheckout} variant="contained" size={'small'}>Check Out</Button></span>
                    </span>

                </div>

            );
        }

        if(loginStatus && showProjects){
            // ProjectCall();
        }
    }, [login, username, logout, createAccount, joinClicked, createProject, loginStatus, showProjects]);


//     function Projects () {
//     const components = [];
//
//     for (let i = 1; i < 4; i++) {
//         components.push(Docs(`Project ${i}`));
//     }
//
//     return (
//         <projects>
//             <div className={"collection"}>
//                 <div>
//                     <h1>Your Projects</h1>
//                     {/*<div>{Docs()}</div>*/}
//                     {components}
//                 </div>
//             </div>
//         </projects>
//     );
// }




    return (
        <div>

            {/*Login Section*/}
            <div className={"login"}>
                <h1 className={"loginHeader"}>{loginLabel}</h1>

                { loginStatus ? (
                    <div>
                        <div>{username}</div>
                        <span><Button onClick={() => setLogout(true)} variant="contained" size={'small'}>Log Out</Button></span>
                    </div>
                ):(
                    <div className={"login"}>
                        <span><TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
                        <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
                        <span><Button onClick={() => setLogin(true)} variant="contained" size={'small'}>Log In</Button></span>
                        <span>or</span>
                        <span><Button onClick={() => setCreateAccount(true)} variant="contained" size={'small'}>Create Account</Button></span>
                    </div>
                )}
            </div>

            {/*Join Project Section*/}
            <div className={"collection"}>
                <div className={"login"}>
                    <h1><strong>Join Project</strong></h1>
                    <span><TextField value={id} onChange={(e) => setId(e.target.value)} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={() => setJoinClicked(true)}>Join</Button></span>
                    {/*Message Section*/}
                    <div>
                        {joinMessage && (
                            <div>
                                <p>Response data:</p>
                                <pre>{JSON.stringify(joinMessage, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/*Create Project Section*/}
            <div className={"collection"}>
                <div className={"login"}>
                    <h1><strong>Create Project</strong></h1>
                    <span><TextField value={projectName} onChange={(e) => setProjectName(e.target.value)} id="outlined-basic" label="Enter Project Name" variant="outlined" size={'small'} /></span>
                    <span><TextField value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} id="outlined-basic" label="Enter Description" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={() => setCreateProject(true)}>Create</Button></span>
                </div>
            </div>

            {/*Show Project List Section if logged in*/}
            { loginStatus ? (
                <div className={"collection"}>
                    <h1>Projects</h1>
                    <div className={"doc"}>
                        <h2>Your active projects...</h2>
                        {collection}
                    </div>
                    {/*{ProjectCall(getProjects)}*/}
                </div>

            ):(
                <div className={"collection"}>
                    <h1>Projects</h1>
                    <div className={"doc"}>
                        <h2>You have no active projects.</h2>
                    </div>
                </div>
            )}


        </div>
    );
}

function ProjectCall(projectList){
    // window.alert("You've called an outside function!");
    window.alert(projectList)
    const components = [];

    projectList.forEach(project => {
        components.push(Docs(project.name))
    })

    return (
        <div className={"collection"}>
            <h1>Projects</h1>
            <div className={"doc"}>
                <h2>Your active projects...</h2>
                {components}
            </div>
        </div>
    )

}
function Docs(name) {

    const [joined, setJoined] = useState(false);
    const [notInProject, setNotInProject] = useState(true);
    const [btnText, setBtnText] = useState('Join');

    const [avail1, setAvail1] = useState(200);
    const [avail2, setAvail2] = useState(200);

    const [cap1, setCap1] = useState(200);
    const [cap2, setCap2] = useState(200);

    const [qty1, setQty1] = useState(0);
    const [qty2, setQty2] = useState(0);

    const [checkin1, setCheckin1] = useState(false);
    const [checkin2, setCheckin2] = useState(false);

    const [checkout1, setCheckout1] = useState(false);
    const [checkout2, setCheckout2] = useState(false);

    const [responseData, setResponseData] = useState(null);

    useEffect( () => {

        function checkIn(name, qty){
            return fetch(`/checkin/${name}*${qty}`)
                .then(response => response.text())
                .then(data => {
                    setResponseData(data);
                    window.alert(`${data}`);

                })
               .catch(error => {
                   // Handle any errors that occurred during the fetch or JSON conversio
                   console.error(error);
                });
        }
        function checkOut(name, qty){
            return fetch(`/checkout/${name}*${qty}`)
                .then(response => response.text())
                .then(data => {
                    setResponseData(data);
                    window.alert(`${data}`);

                })
               .catch(error => {
                   // Handle any errors that occurred during the fetch or JSON conversio
                   console.error(error);
                });
        }

        function joinProject(name){
            return fetch(`/join/${name}`)
                .then(response => response.text())
                .then(data => {
                    setResponseData(data);
                    window.alert(`${data}`);

                })
               .catch(error => {
                   // Handle any errors that occurred during the fetch or JSON conversio
                   console.error(error);
                });
        }

        function leaveProject(name){
            return fetch(`/leave/${name}`)
                .then(response => response.text())
                .then(data => {
                    setResponseData(data);
                    window.alert(`${data}`);

                })
               .catch(error => {
                   // Handle any errors that occurred during the fetch or JSON conversio
                   console.error(error);
                });
        }

        if(checkin1){
            setCheckin1(false);
            checkIn(name,qty1);
        }
        if(checkout1){
            setCheckout1(false);
            checkOut(name,qty1);
        }
        if(checkin2){
            setCheckin2(false);
            checkIn(name,qty2);
        }
        if(checkout2){
            setCheckout2(false);
            checkOut(name,qty2);
        }
        if(joined){
            if(notInProject){
                setNotInProject(false);
                joinProject(name);
                setBtnText('Leave');
            }
            else {
                setNotInProject(true);
                leaveProject(name);
                setBtnText('Join');
            }

            setJoined(false);
        }

    }, [name, checkin1, checkout1, checkin2, checkout2, joined, notInProject]);

    return (
         <div className={"doc"}>
             <h2><strong>{name}</strong></h2>

             <div className={"spacearound"}>

                 user1, user2, user3
                 {/*<span><Button onClick={() => setJoined(true)} variant="contained" size={'small'}>{btnText}</Button></span>*/}
                 <span><Button onClick={() => setJoined(true)} variant="contained" size={'small'}>Leave</Button></span>
             </div>

            <span className={"hardwareSet"}>
                <span><strong>HWSet1</strong> </span>
                <span><strong>Availability: </strong> {avail1} / {cap1} </span>
                <span><TextField value={qty1} onChange={(e) => setQty1(e.target.value)} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                <span><Button onClick={() => setCheckin1(true)} variant="contained" size={'small'}>Check In</Button></span>
                <span><Button onClick={() => setCheckout1(true)} variant="contained" size={'small'}>Check Out</Button></span>
            </span>
             <span className={"hardwareSet"}>
                <span><strong>HWSet2</strong> </span>
                <span><strong>Availability: </strong> {avail2} / {cap2} </span>
                <span><TextField value={qty2} onChange={(e) => setQty2(e.target.value)} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                <span><Button onClick={() => setCheckin2(true)} variant="contained" size={'small'}>Check In</Button></span>
                <span><Button onClick={() => setCheckout2(true)} variant="contained" size={'small'}>Check Out</Button></span>
            </span>
         </div>
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

    //Response variables
    const [loginMessage, setLoginMessage] = useState(null);
    const [joinMessage, setJoinMessage] = useState(null);
    const [createProjectMessage, setCreateProjectMessage] = useState(null);
    const [showProjectsMessage, setShowProjectsMessage] = useState(null);
    const [checkinMessage, setCheckinMessage] = useState(null);
    const [checkoutMessage, setCheckoutMessage] = useState(null);

    // Login variables
    const [loginLabel, setLoginLabel] = useState('Log In');
    const [loginStatus, setLoginStatus] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [logout, setLogout] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    //create project variables
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [createProject, setCreateProject] = useState(false);

    // join project variables
    const [joinClicked, setJoinClicked] = useState(false);
    const [id, setId] = useState('');

    //Project Variables
    const [getProjects, setGetProjects] = useState([]);
    const [collection, setCollection] = useState([]);

        //Doc variables
        const [joined, setJoined] = useState(true);
        const [qty1, setQty1] = useState(0);
        const [qty2, setQty2] = useState(0);

        //Hardware set 1 variables
        const [avail1, setAvail1] = useState(200);
        const [cap1, setCap1] = useState(200);
        const [checkin1, setCheckin1] = useState(false);
        const [checkout1, setCheckout1] = useState(false);

        //Hardware set 2 variables
        const [avail2, setAvail2] = useState(200);
        const [cap2, setCap2] = useState(200);
        const [checkin2, setCheckin2] = useState(false);
        const [checkout2, setCheckout2] = useState(false);

    useEffect(() => {

        // *** FETCH FUNCIONS ***

        //login hooks
        function fetchLogin() {
            return fetch(`/login/<${username}>/<${password}>`)
                .then(response => response.json())
                .then(data => setLoginMessage(data))
                // .then(data => window.alert(`This would be a Flask Call sending: ${textFieldValue} as the user.`))
                .catch(error => window.alert(error));
        }

        //create project hooks
        function fetchCreateProject() {
            return fetch(`/createProject/<${projectName}>/<${projectDescription}>`)
                .then(response => response.json())
                .then(data => setCreateProjectMessage(data))
                // .then(data => fetchShowProjects())
                .catch(error => window.alert(error));
        }

        //join project hook
        function fetchJoin() {
            return fetch(`/joinProject/<${id}>/<${username}>`)
                .then(response => response.json())
                .then(data => setJoinMessage(data))
                .catch(error => window.alert(error));
        }

        //show projects hooks
        function fetchShowProjects(){
            return fetch(`/projects/<${username}>`)
                .then(response => response.json())
                .then(data => setGetProjects(data))
                .catch(error => window.alert(error))
        }

        // *** CONDITIONALS ***
        if(login) {
            fetchLogin();
            setLogin(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
        }
        if(logout){
            setLogout(false);
            setLoginLabel('Log In');
            setLoginStatus(false);
            setUsername('');
        }
        if(createAccount) {
            window.alert("Created New Account.")
            fetchLogin();
            setLogin(false);
            setLoginLabel('Logged In');
            setLoginStatus(true);
            setCreateAccount(false);
        }
        if(loginStatus) {
            fetchShowProjects();
        }
        if(createProject){
            fetchCreateProject();
            setCreateProject(false);
            window.alert(`You have created Project: ${projectName} with Description: ${projectDescription}`)
            setProjectName('');
            setProjectDescription('');
            fetchShowProjects();
        }
        if(joinClicked){
            fetchJoin();
            window.alert(`You have joined Project: ${id}`)
            setJoinClicked(false);
            setId('');
            fetchShowProjects();
        }
        if(checkin1){
            setCheckin1(false);

            const newAmt = avail1 + qty1;

            if(newAmt > cap1){
                setQty1(0);
                setAvail1(cap1);
                window.alert(`You are attempting to check in too many units! ${newAmt - cap1} units from HWSet1 where NOT checked in`);
            }
            else {
                window.alert(`You have checked in ${qty1} units from HWSet1.`);
                setQty1(0);
                setAvail1(newAmt);
            }
        }

    },[login, logout, createAccount, loginStatus, createProject, joinClicked, checkin1]);

    return (
        <div className={"App"}>
            <Header />

            {/*Login Section*/}
            <div className={"login"}>
                <h1 className={"loginHeader"}>{loginLabel}</h1>

                { loginStatus ? (
                    <div>
                        <div>{username}</div>
                        <span><Button onClick={() => setLogout(true)} variant="contained" size={'small'}>Log Out</Button></span>
                    </div>
                ):(
                    <div className={"login"}>
                        <span><TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" size={'small'} /></span>
                        <span><TextField id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
                        <span><Button onClick={() => setLogin(true)} variant="contained" size={'small'}>Log In</Button></span>
                        <span>or</span>
                        <span><Button onClick={() => setCreateAccount(true)} variant="contained" size={'small'}>Create Account</Button></span>
                    </div>
                )}
            </div>

            {/*Create Project Section*/}
            <div className={"collection"}>
                <div className={"login"}>
                    <h1><strong>Create Project</strong></h1>
                    <span><TextField value={projectName} onChange={(e) => setProjectName(e.target.value)} id="outlined-basic" label="Enter Project Name" variant="outlined" size={'small'} /></span>
                    <span><TextField value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} id="outlined-basic" label="Enter Description" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={() => setCreateProject(true)}>Create</Button></span>
                </div>
            </div>

           {/*Join Project Section*/}
            <div className={"collection"}>
                <div className={"login"}>
                    <h1><strong>Join Project</strong></h1>
                    <span><TextField value={id} onChange={(e) => setId(e.target.value)} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                    <span><Button variant="contained" size={'small'} onClick={() => setJoinClicked(true)}>Join</Button></span>
                    {/*Message Section*/}
                    <div>
                        {joinMessage && (
                            <div>
                                <p>Response data:</p>
                                <pre>{JSON.stringify(joinMessage, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/*Show Project List Section if logged in*/}
            { loginStatus ? (
                <div className={"collection"}>
                    <h1>Projects</h1>
                    <div className={"doc"}>
                        <h2>Your active projects...</h2>
                        {getProjects.map((project) => (
                            <div key={project.id}>

                                <div className={"doc"}>
                                     <h2><strong>Project: {project.name}</strong></h2>
                                    <div className={"docHeader"}>
                                        <strong>Users:</strong> {username} <strong>Description:</strong> {project.description}
                                        <span><Button variant="contained" size={'small'}>Leave</Button></span>
                                    </div>
                                    <span className={"hardwareSet"}>
                                        <span><strong>HWSet1</strong> </span>
                                        <span><strong>Availability: </strong> {avail1} / {cap1} </span>
                                        <span><TextField value={qty1} onChange={(e)=> setQty1(parseInt(e.target.value))} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                                        <span><Button onClick={() => setCheckin1(true)} variant="contained" size={'small'}>Check In</Button></span>
                                        <span><Button variant="contained" size={'small'}>Check Out</Button></span>
                                    </span>
                                     <span className={"hardwareSet"}>
                                        <span><strong>HWSet2</strong> </span>
                                        <span><strong>Availability: </strong> {avail2} / {cap2} </span>
                                        <span><TextField id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                                        <span><Button variant="contained" size={'small'}>Check In</Button></span>
                                        <span><Button variant="contained" size={'small'}>Check Out</Button></span>
                                    </span>
                                 </div>

                            </div>
                         ))}
                        {getProjects && (
                            <div>
                              <p>Response data:</p>
                              <pre>{JSON.stringify(getProjects, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                    {/*{ProjectCall(getProjects)}*/}
                </div>

            ):(
                <div className={"collection"}>
                    <h1>Projects</h1>
                    <div className={"doc"}>
                        <h2>You have no active projects.</h2>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default AwesomeApp;