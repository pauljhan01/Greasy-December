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
    const [leaveMessage, setLeaveMessage] = useState(null);

    // Login variables
    const [loginLabel, setLoginLabel] = useState('Log In');
    const [loginStatus, setLoginStatus] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [logout, setLogout] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    //Project Variables
    const [getProjects, setGetProjects] = useState([]);
    const [collection, setCollection] = useState([]);
    const [id, setId] = useState('');

        //create project variables
        const [projectName, setProjectName] = useState('');
        const [projectDescription, setProjectDescription] = useState('');
        const [createProject, setCreateProject] = useState(false);

        // join project variables
        const [joinClicked, setJoinClicked] = useState(false);

        // leave project variables
        const [leaveProject, setLeaveProject] = useState(false);

        //Project Doc variables
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

        // *** FETCH FUNCTIONS ***

        //login hooks
        function fetchLogin() {
            return fetch(`/login/<${username}>/<${password}>`)
                .then(response => response.json())
                .then(data => {
                    if( data == 'Fail'){
                        window.alert('Your username or password is incorrect. Please try again.');
                    } else {
                        setLoginMessage(data);
                        setLoginLabel('Logged In');
                        setLoginStatus(true);
                    }
                })
                .catch(error => window.alert('Your username or password is incorrect. Please try again.'));
        }

        function fetchCreateAccount() {
            return fetch(`/Users_db/createUser/<${username}>/<${password}>`)
                .then(response => response.json())
                .then(data => {
                    if ( data == 'Fail'){
                        window.alert('Failed to create an account. Please try again.');
                    } else {
                        setLoginMessage(data);
                        setLoginLabel('Logged In');
                        setLoginStatus(true);
                        window.alert("You've created a new account.");
                    }
                })
                // .then(data => window.alert(`This would be a Flask Call sending: ${textFieldValue} as the user.`))
                .catch(error => window.alert('Failed to create an account. Please try again.'));
        }

        //create project hooks
        function fetchCreateProject() {
            return fetch(`projects/createProject/<${projectName}>/<${projectDescription}>`)
                .then(response => response.json())
                .then(data => {
                    if ( data == 'Fail'){
                        window.alert(`Failed to create ${projectName}. The project either already exists or there are max number of projects.`);
                    } else {
                        setCreateProjectMessage(data);
                        window.alert(`You have created Project: ${projectName} with Description: ${projectDescription}`);
                    }
                })
                .catch(error => window.alert(`Failed to create ${projectName}. The project either already exists or there are max number of projects.`));
        }

        //join project hook
        function fetchJoin() {
            return fetch(`/projects/joinByID/<${id}>/<${username}>`)
                .then(response => response.json())
                .then(data => {
                    if ( data == 'Fail'){
                        window.alert(`Failed to join Project ${id}. Please try again.`);
                    } else {
                        setJoinMessage(data);
                        window.alert(`You have joined Project: ${id}`);
                    }
                })
                .catch(error => window.alert(`Failed to join Project ${id}. Please try again.`));
        }

        //leave project hook
        function fetchLeave(){
            return fetch(`/projects/leaveByID/<${id}>/<${username}>`)
                .then(response => response.json())
                .then(data => {
                    if(data == 'Fail') {
                        window.alert(`Leave project failed, please try again.`);
                    } else {
                        setLeaveMessage(data);
                        window.alert(`You have left Project: ${id}`);
                    }
                })
                .catch(error => window.alert('Leave project failed, please try again.'));
        }

        //show projects hooks
        function fetchShowProjects(){
            return fetch(`/projects`)
                .then(response => response.json())
                .then(data => setGetProjects(data))
                .catch(error => window.alert("You have no active projects."))
        }

        // *** CONDITIONALS ***
        if(login) {
            fetchLogin();
            setLogin(false) ;
        }
        if(logout){
            setLogout(false);
            setLoginLabel('Log In');
            setLoginStatus(false);
            setUsername('');
        }
        if(createAccount) {
            fetchCreateAccount();
            setCreateAccount(false);
        }
        if(loginStatus) {
            // fetchShowProjects();
        }
        if(createProject){
            fetchCreateProject();
            setProjectName('');
            setProjectDescription('');
            setCreateProject(false)
            // fetchShowProjects();
        }
        if(joinClicked){
            fetchJoin();
            setJoinClicked(false);
            setId('');
            // fetchShowProjects();
        }
        if(leaveProject){
            fetchLeave();
            setLeaveProject(false);
            setId('');
            fetchShowProjects();
        }
        if(checkin1){
            setCheckin1(false);

            const newAmt = avail1 + qty1;

            if(newAmt > cap1){
                fetch(`HWSets/checkIn/${id}/HWSet1/${avail1}`).then(
                    response => response.json()
                ).then(
                   data => setCheckinMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert('Checking into HWSet1 failed. Please try again')
                )
                //if backend sends us failure, alert user
                if(checkinMessage === 'Fail'){
                    window.alert("Checking into HWSet1 failed. Please try again.")
                }
                else{
                    window.alert(`You are attempting to check in too many units! ${newAmt - cap1} units from HWSet1 were not checked in`)
                    setQty1(0)
                    setAvail1(newAmt)
                }
            }
            else {
                fetch(`HWSets/checkIn/${id}/HWSet1/${qty1}`).then(
                   response => response.json() 
                ).then(
                    data => setCheckinMessage(data)
                ).
                catch(
                    error => console.log(error),
                    window.alert(`Checking into HWSet1 failed. Please try again.`) 
                )
                if(checkinMessage === 'Fail'){
                    window.alert("Checking into HWSet1 failed. Please try again.")
                }
                else{
                    window.alert(`You have checked in ${qty1} units into HWSet1`)
                    setQty1(0)
                    setAvail1(newAmt)
                }
            }
        }
        if(checkout1){
            setCheckout1(false);

            const newAmt = avail1 - qty1;

            if(qty1 > avail1){
                fetch(`HWSets/checkOut/${id}/HWSet2/${avail1}`).then(
                    response => response.json()
                ).then(
                    data => setCheckoutMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert(`Checking out of HWSet1 failed. Please try again.`)
                )
                if(checkoutMessage === 'Fail'){
                    window.alert(`Checking out of HWSet1 failed. Please try again.`)
                }
                else{
                    window.alert(`You are attempting to check out too many units! ${avail1} units from HWSet1 were checked out`)
                    setQty1(0)
                    setAvail1(0) 
                }
            }
            else {
                fetch(`HWSets/checkOut/${id}/HWSet1/${qty1}`).then(
                    response => response.json()
                ).then(
                    data => setCheckoutMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert('Checking out from HWSet1 failed. Please try again.')
                )
                if(checkoutMessage === 'Fail'){
                    window.alert('Checking out from HWSet1 failed. Please try again.')
                }
                else{
                    window.alert(`You have checked out ${qty1} units from HWSet1`)
                    setQty1(0)
                    setAvail1(newAmt)
                }
            }
        }
        if(checkin2){
            setCheckin2(false);

            const newAmt = avail2 + qty2;

            if(newAmt > cap2){
                fetch(`HWSets/checkIn/${id}/HWSet2/${avail2}`).then(
                    response => response.json()
                ).then(
                    data => setCheckinMessage(data)  
                ).catch(
                    error => window.alert('Checking into HWSet2 failed. Please try again.')
                )
                if(checkinMessage ===  `Fail`){
                    window.alert('Checking into HWSet2 failed. Please try again.');
                }
                else{
                    window.alert(`You are attempting to check in too many units! ${newAmt - cap2} units from HWSet2 were not checked in`);
                    setQty2(0);
                    setAvail2(cap2);
                }
            }
            else {
                fetch(`HWSets/checkIn/${id}/HWSet2/${qty2}`).then(
                    response => response.json()
                ).then(
                    data => setCheckinMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert(`Checking into HWSet2 failed. Please try again.`)
                )
                if(checkinMessage === `Fail`){
                    window.alert(`Checking into HWSet2 failed. Please try again.`)
                }
                else{
                    window.alert(`You have checked in ${qty2} units from HWSet2.`);
                    setQty2(0);
                    setAvail2(newAmt);
                }
               
            }
        }
        if(checkout2){
            setCheckout2(false);

            const newAmt = avail2 - qty2;

            if(qty2 > avail2){
                fetch(`HWSets/checkOut/${id}/HWSet2/${avail2}`).then(
                    response => response.json()
                ).then(
                    data => setCheckoutMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert(`Checking out from HWSet2 failed. Please try again.`)
                )
                if(checkoutMessage === `Fail`){
                    window.alert(`Checking out from HWSet2 failed. Please try again.`)
                }
                else{
                    window.alert(`You are attempting to check out too many units! ${avail2} units from HWSet2 were checked out`);
                    setQty2(0);
                    setAvail2(0);
                }
                // window.alert(`You are attempting to check out too many units! ${avail2} units from HWSet2 were checked out`);
                // setQty2(0);
                // setAvail2(0);
            }
            else {
                fetch(`HWSets/checkOut/${id}/HWSet2/${qty2}`).then(
                    response => response.json()
                ).then(
                    data => setCheckoutMessage(data)
                ).catch(
                    error => console.log(error),
                    window.alert("Checking out from HWSet2 failed. Please try again.")
                )
                if(checkoutMessage === `Fail`){
                    window.alert("Checking out from HWSet2 failed. Please try again.")  
                }
                else{
                    window.alert(`You have checked out ${qty2} units from HWSet2.`);
                    setQty2(0);
                    setAvail2(newAmt);
                }
                // window.alert(`You have checked out ${qty2} units from HWSet2.`);
                // setQty2(0);
                // setAvail2(newAmt);
            }
        }

    },[login, logout, createAccount, loginStatus, createProject, joinClicked, leaveProject, checkin1, checkin2, checkout1, checkout2]);

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

            {/*Show Project List Section if logged in*/}
            { loginStatus ? (
                <div>

                    {/*Create Project Section*/}
                    <div className={"collection"}>
                        <div className={"login"}>
                            <h1><strong>Create Project</strong></h1>
                            <span><TextField value={projectName} onChange={(e) => setProjectName(e.target.value)} id="outlined-basic" label="Enter Project Name" variant="outlined" size={'small'} /></span>
                            <span><TextField value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} id="outlined-basic" label="Enter Description" variant="outlined" size={'small'} /></span>
                            <span><Button variant="contained" size={'small'} onClick={() => setCreateProject(true)}>Create</Button></span>
                        </div>
                    </div>

                    {/*Project Management Section*/}
                    <div className={"collection"}>
                        <h1>Projects</h1>
                        <div className={"doc"}>
                            <h2>Please Enter the Project ID</h2>
                            <span className={"hardwareSetR"}>
                                <span><TextField value={id} onChange={(e)=> setId(e.target.value)} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                                <span><Button variant="contained" size={'small'} onClick={() => setJoinClicked(true)}>Join</Button></span>
                                <span><Button onClick={() => setLeaveProject(true)} variant="contained" size={'small'}>Leave</Button></span>
                            </span>

                            <span className={"hardwareSet"}>
                                <span><strong>HWSet1</strong> </span>
                                <span><strong>Availability: </strong> {avail1} / {cap1} </span>
                                <span><TextField value={qty1} onChange={(e)=> setQty1(parseInt(e.target.value))} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                                <span><Button onClick={() => setCheckin1(true)} variant="contained" size={'small'}>Check In</Button></span>
                                <span><Button onClick={() => setCheckout1(true)} variant="contained" size={'small'}>Check Out</Button></span>
                            </span>
                             <span className={"hardwareSet"}>
                                <span><strong>HWSet2</strong> </span>
                                <span><strong>Availability: </strong> {avail2} / {cap2} </span>
                                <span><TextField value={qty2} onChange={(e)=> setQty2(parseInt(e.target.value))} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                                <span><Button onClick={() => setCheckin2(true)} variant="contained" size={'small'}>Check In</Button></span>
                                <span><Button onClick={() => setCheckout2(true)} variant="contained" size={'small'}>Check Out</Button></span>
                            </span>
                         </div>
                    </div>

                    {/*Users Lists of Projects Section*/}
                    <div className={"collection"}>
                        <h1>Your Active Projects</h1>
                        <div className={"doc"}>
                            {getProjects.map((project) => (
                                <div key={project.id}>
                                    <div className={"doc"}>
                                         <h2><strong>Project: {project.name}  ID: {id} </strong></h2>
                                        <div className={"hardwareSet"}>
                                            <strong>Users:</strong> {username} <strong>Description:</strong> {project.description}
                                        </div>
                                        <span className={"hardwareSet"}>
                                            <span><strong>HWSet1</strong> </span>
                                            <span>Checked Out: {project.hardwareSet1CheckedOut} </span>
                                        </span>
                                         <span className={"hardwareSet"}>
                                            <span><strong>HWSet2</strong> </span>
                                            <span>Checked Out: {project.hardwareSet2CheckedOut} </span>
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
                    </div>

                </div>

            ):(
                // Project List When Not Logged In
                <div className={"collection"}>
                    <h1>Projects</h1>
                    <div className={"doc"}>
                        <h2>Log in to see your projects.</h2>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default AwesomeApp;