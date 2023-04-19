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
        const [qty, setQty] = useState('');

        //Hardware management section
        const [hwprojID, setHWprojID] = useState('');
        const [hwData, setHWData] = useState([]);
        const [hwSetID, setHWSetID] = useState('');
        const [checkin, setCheckin] = useState(false);
        const [checkout, setCheckout] = useState(false);


    useEffect(() => {

        // *** FETCH FUNCTIONS ***

        //login hooks
        function fetchLogin() {
            return fetch(`/login/<${username}>/<${password}>`)
                .then(response => response.json())
                .then(data => {
                    if( data === 'Fail'){
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
                    if ( data === 'Fail'){
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
                    if ( data === 'Fail'){
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
                    if ( data === 'Fail'){
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
                    if(data === 'Fail') {
                        window.alert(`You failed to leave project ${id}, please try again.`);
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
                .catch(error => window.alert("Get Project List Failed."))
        }


        //Check Out Hardware
        function fetchCheckOut(hwsetID, amount){
            return fetch(`/HWSets/checkOutV2/${hwsetID}/${hwprojID}/${amount}/${username}`)
                .then(response => response.json())
                .then(data => {
                    setGetProjects(data)
                    if( data === 'Fail' ) { window.alert("Check Out Failed. Please try again.")}
                    else window.alert(`You have checked out ${amount} units to Hardware Set ${hwsetID} for Project ${hwprojID}.`)
                })
                .catch(error => window.alert("System: Check Out Failed. Please try again."))
        }

        //Check In Hardware
        function fetchCheckIn(hwsetID, amount){
            return fetch(`/HWSets/checkInV2/${hwsetID}/${hwprojID}/${amount}/${username}`)
                .then(response => response.json())
                .then(data => {
                    setGetProjects(data)
                    if( data === 'Fail' ) { window.alert("Check In Failed. Please try again.")}
                    else window.alert(`You have checked in ${amount} units to Hardware Set ${hwsetID} for Project ${hwprojID}`)
                })
                .catch(error => window.alert("System: Check In Failed. Please try again."))
        }

        function fetchHWSets(){
            return fetch(`/HWSets`)
                .then(response => response.json())
                .then(data => {
                    setHWData(data)
                })
                .catch(error => window.alert("System: Failed to retrieve hardware set data."))
        }

        // *** CONDITIONALS ***
        if(login) {
            if(username === '' || password === '') window.alert("Please enter a user name and password.")
            else {
                fetchLogin();
                fetchHWSets();
            }
            setLogin(false) ;
        }
        if(logout){
            setLogout(false);
            setLoginLabel('Log In');
            setLoginStatus(false);
            setUsername('');
            setPassword('');
        }
        if(createAccount) {
            if(username === '' || password === '') window.alert("Please enter a user name and password.")
            else {
                fetchCreateAccount();
            }
            setUsername('');
            setPassword('');
            setCreateAccount(false);
        }
        if(loginStatus) {
            fetchShowProjects();
        }
        if(createProject){
            if(projectName === '' || projectDescription === '') window.alert("Please enter a project name and description.")
            else {
                fetchCreateProject();
                fetchShowProjects();
            }

            setProjectName('');
            setProjectDescription('');
            setCreateProject(false)

        }
        if(joinClicked){
            if(id === '') window.alert("Please enter a Project Id.")
            else {
                fetchJoin();
                fetchShowProjects();
            }
            setJoinClicked(false);
            setId('');
        }
        if(leaveProject){
            if (id === '') window.alert(("Please enter a Project Id."))
            else {
                fetchLeave();
                fetchShowProjects();
            }  
        }
        // if(checkin1){
        //     setCheckin1(false);

        //     const newAmt = avail1 + qty1;

        //     if(newAmt > cap1){
        //         fetch(`HWSets/checkIn/${id}/HWSet1/${avail1}`).then(
        //             response => response.json()
        //         ).then(
        //            data => setCheckinMessage(data)
        //         ).catch(
        //             error => console.log(error),
        //             window.alert('Checking into HWSet1 failed. Please try again')
        //         )
        //         //if backend sends us failure, alert user
        //         if(checkinMessage === 'Fail'){
        //             window.alert("Checking into HWSet1 failed. Please try again.")
        //         }
        //         else{
        //             window.alert(`You are attempting to check in too many units! ${newAmt - cap1} units from HWSet1 were not checked in`)
        //             setQty1(0)
        //             setAvail1(newAmt)
        //         }
        //     }
        //     else {
        //         fetch(`HWSets/checkIn/${id}/HWSet1/${qty1}`).then(
        //            response => response.json() 
        //         ).then(
        //             data => setCheckinMessage(data)
        //         ).
        //         catch(
        //             error => console.log(error),
        //             window.alert(`Checking into HWSet1 failed. Please try again.`) 
        //         )
        //         if(checkinMessage === 'Fail'){
        //             window.alert("Checking into HWSet1 failed. Please try again.")
        //         }
        //         else{
        //             window.alert(`You have checked in ${qty1} units into HWSet1`)
        //             setQty1(0)
        //             setAvail1(newAmt)
        //         }
        //     }
        // }
        if(checkin){
            setCheckin(false);
            if(hwprojID === '' || qty === ''){
                window.alert('Please input Hardware ID and Hardware Amount')
            }
            else{
                //     if(qty > avail1){
                //         fetch(`HWSets/checkOut/${id}/HWSet2/${avail1}`).then(
                //             response => response.json()
                //         ).then(
                //             data => setCheckoutMessage(data)
                //         ).catch(
                //             error => console.log(error),
                //             window.alert(`Checking out of HWSet1 failed. Please try again.`)
                //         )
                //     }
                //     if(checkoutMessage === 'Fail'){
                //         window.alert(`Checking out of HWSet1 failed. Please try again.`)
                //     }
                //     else{
                //         window.alert(`You are attempting to check out too many units! ${avail1} units from HWSet1 were checked out`)
                //         setQty1(0)
                //         setAvail1(0) 
                //     }
                // ))}
            }
            // const newAmt = avail1 - qty1;

            // if(qty1 > avail1){
            //     fetch(`HWSets/checkOut/${id}/HWSet2/${avail1}`).then(
            //         response => response.json()
            //     ).then(
            //         data => setCheckoutMessage(data)
            //     ).catch(
            //         error => console.log(error),
            //         window.alert(`Checking out of HWSet1 failed. Please try again.`)
            //     )
            //     if(checkoutMessage === 'Fail'){
            //         window.alert(`Checking out of HWSet1 failed. Please try again.`)
            //     }
            //     else{
            //         window.alert(`You are attempting to check out too many units! ${avail1} units from HWSet1 were checked out`)
            //         setQty1(0)
            //         setAvail1(0) 
            //     }
            // }
            // else {
            //     fetch(`HWSets/checkOut/${id}/HWSet1/${qty1}`).then(
            //         response => response.json()
            //     ).then(
            //         data => setCheckoutMessage(data)
            //     ).catch(
            //         error => console.log(error),
            //         window.alert('Checking out from HWSet1 failed. Please try again.')
            //     )
            //     if(checkoutMessage === 'Fail'){
            //         window.alert('Checking out from HWSet1 failed. Please try again.')
            //     }
            //     else{
            //         window.alert(`You have checked out ${qty1} units from HWSet1`)
            //         setQty1(0)
            //         setAvail1(newAmt)
            //     }
            // }
        }
        if(checkout){
            setCheckout(false);

            // const newAmt = avail2 + qty2;

            // if(newAmt > cap2){
            //     fetch(`HWSets/checkIn/${id}/HWSet2/${avail2}`).then(
            //         response => response.json()
            //     ).then(
            //         data => setCheckinMessage(data)  
            //     ).catch(
            //         error => console.log(error),
            //         window.alert('Checking into HWSet2 failed. Please try again.')
            //     )
            //     if(checkinMessage ===  `Fail`){
            //         window.alert('Checking into HWSet2 failed. Please try again.')
            //     }
            //     else{
            //         window.alert(`You are attempting to check in too many units! ${newAmt - cap2} units from HWSet2 were not checked in`)
            //         setQty2(0)
            //         setAvail2(cap2)
            //     }
            // }
            // else {
            //     fetch(`HWSets/checkIn/${id}/HWSet2/${qty2}`).then(
            //         response => response.json()
            //     ).then(
            //         data => setCheckinMessage(data)
            //     ).catch(
            //         error => console.log(error),
            //         window.alert(`Checking into HWSet2 failed. Please try again.`)
            //     )
            //     if(checkinMessage === `Fail`){
            //         window.alert(`Checking into HWSet2 failed. Please try again.`)
            //     }
            //     else{
            //         window.alert(`You have checked in ${qty2} units from HWSet2.`);
            //         setQty2(0);
            //         setAvail2(newAmt);
            //     }
               
            // }
        }
        // if(checkout2){
        //     setCheckout2(false);

        //     const newAmt = avail2 - qty2;

        // }


    },[login, logout, createAccount, loginStatus, createProject, joinClicked, leaveProject, hwprojID, checkin, checkout]);

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
                        <span><TextField value={password} onChange={ (e) => setPassword(e.target.value)} id="outlined-basic" label="Enter Password" variant="outlined" size={'small'} /></span>
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
                        <h1>Join or Leave a Project</h1>
                        <div className={"doc"}>
                            <h2>Please Enter the Project ID</h2>
                            <span className={"hardwareSetR"}>
                                <span><TextField value={id} onChange={(e)=> setId(e.target.value)} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} /></span>
                                <span><Button variant="contained" size={'small'} onClick={() => setJoinClicked(true)}>Join</Button></span>
                                <span><Button onClick={() => setLeaveProject(true)} variant="contained" size={'small'}>Leave</Button></span>
                            </span>
                         </div>
                    </div>

                    {/*Hardware Management Section*/}
                    <div className={"collection"}>
                        <h1>Check In/Out Hardware</h1>
                        <div className={"doc"}>
                            <div>
                                <h2>Project ID</h2>
                                <TextField value={hwprojID} onChange={(e)=> setHWprojID(e.target.value)} id="outlined-basic" label="Enter Project ID" variant="outlined" size={'small'} />
                            </div>
                        <div>
                            <h2>Hardware Set Info</h2>

                            <div className={"doc"}>
                                {Object.keys(hwData).map((key) => (
                                    <div>
                                        <strong>Hardware set {key}:</strong> Availability {hwData[key][1]} / Capacity {hwData[key][0]}
                                    </div>
                                ))}
                            </div>
                            <div className={"hardwareSet"}>
                                <TextField value={hwSetID} onChange={(e)=> setHWSetID(e.target.value)} id="outlined-basic" label="Hardware Set ID" variant="outlined" size={'small'} />
                                <span><TextField value={qty} onChange={(e)=> setQty(parseInt(e.target.value))} id="outlined-basic" label="Enter Amount" variant="outlined" size={'small'} /></span>
                                <span><Button onClick={() => setCheckin(true)} variant="contained" size={'small'}>Check In</Button></span>
                                <span><Button onClick={() => setCheckout(true)} variant="contained" size={'small'}>Check Out</Button></span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/*Users Lists of Projects Section*/}
                    <div className={"collection"}>
                        <h1>Project List</h1>
                        <div className={"doc"}>

                            {Object.keys(getProjects).map((key) => (
                                <div className={"projBlock"}>
                                    <div className={"doc"}>
                                        <div>
                                            <h2>Project Name: {getProjects[key][0]}</h2>
                                            <strong>Project ID:</strong> {key}
                                        </div>
                                        <div className={"projList"}>
                                            <strong>Description: </strong> {getProjects[key][1]}
                                            {/* <strong>Hardware Checked Out: </strong> {getProjects[key][2]} */}
                                        </div>
                                    </div>
                                </div>

                            ))}

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