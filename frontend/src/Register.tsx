import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import background from 'frontend/src/images/img.png';
import ScrollLock from 'react-scrolllock';
import './Login.css';
import Snackbar from '@material-ui/core/Snackbar';

type RegisterProps = {
  callback: (email: string, password: string, firstName: string, lastName: string) => void;
}

const Register = ({ callback }: RegisterProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [message, setMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFirstName(event.target.value);
  }
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLastName(event.target.value);
  }
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEmail(event.target.value);
  }
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPassword(event.target.value);
  }
  const onChangePasswordRepeat = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPasswordRepeat(event.target.value);
  }

  const onRegister = () => {
      if (firstName.length === 0 || lastName.length === 0) {
          setMessage('Please enter your first and last name!');
          setSnackBarOpen(true);
      }
      else if (email.length === 0 || password.length === 0) {
          setMessage('Please enter your email address and password!');
          setSnackBarOpen(true);
      }
      else if (password === passwordRepeat) {
          callback(email, password, firstName, lastName);
      }
  }

  return (
    <div>
       <ScrollLock>
       <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
       </ScrollLock>
      <div className="Wrapper">
        <div className="Sections">
            <h1>Register</h1>
            <br />
            <TextField
                label="First Name"
                value={firstName}
                onChange={onChangeFirstName}
                variant="outlined"
                className="Section" />
            <br /><br />
            <TextField
                label="Last Name"
                value={lastName}
                onChange={onChangeLastName}
                variant="outlined"
                className="Section" />
            <br /><br />
            <TextField
                label="Email Address"
                value={email}
                onChange={onChangeEmail}
                variant="outlined"
                className="Section" />
            <br /><br />
            <TextField
                label="Password"
                value={password}
                onChange={onChangePassword}
                error={password.length > 0 && password.length < 7}
                helperText={password.length > 0 && password.length < 7 ? "Password must be at least 7 characters" : ""}
                type={showPassword ? "text" : "password"}
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
                ) }}
                className="Section" />
            <br /><br />
            <TextField
                label="Confirm Password"
                value={passwordRepeat}
                onChange={onChangePasswordRepeat}
                error={password !== passwordRepeat}
                helperText={password !== passwordRepeat ? "Passwords do not match" : ""}
                type={showPassword ? "text" : "password"}
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
                className="Section" />
            <br /><br />
            <Button
                variant="contained"
                className="LoginButton"
                style={{width: '20%'}}
                onClick={onRegister}
                color="primary"
            >
                Register
            </Button>
            <br /> <br />
            <Button color="primary" href="/">Already have an account? Login</Button>
            <Snackbar
                message={message}
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackBarOpen(false)}
            />
        </div>
      </div>
    </div>
  );
}

export default Register;