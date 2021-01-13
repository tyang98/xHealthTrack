import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';

type LoginProps = {
    // callback: (email: string, username: string, password: string) => void;
    callback: (username: string, password: string) => void;
}

const Login = ({ callback }: LoginProps) => {
    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setEmail(event.target.value);
    // }

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUsername(event.target.value);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="Sections">
            <h1>Header ?? text here </h1><br/>
            {/* <TextField
                label="Email"
                className="Section"
                value={email}
                onChange={onChangeEmail} /> <br/> */}
            <TextField
                label="Username"
                className="Section"
                type="text"
                value={username}
                onChange={onChangeUsername} /> <br/>
            <TextField
                label="Password"
                className="Section"
                value={password}
                type="password"
                onChange={onChangePassword} /> <br/><br/>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                    callback(username, password)
                }}
            >Login</Button>
        </div>
        //create acct ?
    );
}

export default Login;