import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';

type LoginProp = {
    callback: (email: string, password: string) => void;
}

const Login = ({ callback }: LoginProp) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="Sections">
            <h1>xHy0rinstyx</h1>
        </div>
    );
}

export default Login;