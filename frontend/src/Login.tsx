import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton} from '@material-ui/core';
import './Login.css';
import background from 'frontend/src/images/img.png';
import ScrollLock from 'react-scrolllock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'


type LoginProps = {
    callback: (email: string, password: string) => void;
}

const Login = ({ callback }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <ScrollLock>
            <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
            </ScrollLock>
            <div className="Wrapper" style={{ justifyContent: 'center'}}> 
                <div className="Sections">
                    <h1>xhy0rinstyx</h1><br/>
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
                    <Button color="primary" href="/register">
                        Create account
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;