import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton} from '@material-ui/core';
import './Login.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'


type LoginProps = {
    // callback: (email: string, username: string, password: string) => void;
    callback: (email: string, password: string) => void;
}

const Login = ({ callback }: LoginProps) => {
    // const [email, setEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setEmail(event.target.value);
    // }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="Sections">
            <h1>xHy0rinstyx</h1><br/>
            {/* <TextField
                label="Email"
                className="Section"
                value={email}
                onChange={onChangeEmail} /> <br/> */}
            <TextField
                label="Email"
                className="Section"
                type="text"
                value={email}
                variant="outlined"
                onChange={onChangeEmail} /> <br/> <br/>
            <TextField
                label="Password"
                className="Section"
                value={password}
                type="password"
                variant="outlined"
                InputProps={{ endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )}}
                onChange={onChangePassword} /> <br/><br/>
            <Button 
                variant="contained"
                style={{width: '20%'}}
                color="primary"
                onClick={() => {callback(email, password)}}
            > Login
            </Button> <br/> <br/>
            <Button color="secondary" href="/register">
                Register if you don't have an account!
            </Button>
        </div>
        //create acct ?
    );
}

export default Login;