import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import background from 'frontend/src/images/img.png';
import ScrollLock from 'react-scrolllock';


type CheckProps = {
    callback: (weight: number, date: Date) => void;
}

const Check = ({ callback }: CheckProps) => {
    const [weight, setWeight] = useState(+'');

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWeight(+event.target.value);
    }

    const onSubmit = () => {
        // if (!(weight instanceOf number)) {
        //     setMessage('Please enter your first and last name!');
        //     setSnackBarOpen(true);
        // }
        // else if (email.length === 0 || password.length === 0) {
        //     setMessage('Please enter your email address and password!');
        //     setSnackBarOpen(true);
        // }
        // else if (password === passwordRepeat) {
        //     callback(weight, new Date());
        // }
        callback(weight, new Date());
    }

    return (
        <div>
            <ScrollLock>
            <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
            </ScrollLock>
            <div className="Wrapper"  style={{ justifyContent: 'center'}}> 
                <div className="Sections">
                    <h1>Daily Check</h1><br/>
                    <TextField
                        label="Weight today"
                        className="Section"
                        type="text"
                        value={weight}
                        variant="outlined"
                        onChange={onChangeWeight} /> <br/> <br/>
{/* add more stuff */}
                    <Button 
                        variant="contained"
                        style={{width: '20%'}}
                        color="primary"
                        onClick={onSubmit}
                    > Submit
                    </Button> <br/> <br/>
                </div>
            </div>
        </div>
    );
}

export default Check;