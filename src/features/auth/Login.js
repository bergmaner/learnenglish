import React from 'react';
import {Button} from '@material-ui/core';
import {fbAuth} from '../../services/firebase';
import {ghAuth} from '../../services/firebase';
import {googleAuth} from '../../services/firebase';

export default () =>
{
    const handleFbLogin = async () => 
    {
        const data = await fbAuth();
    }

    const handleGhLogin = async () => 
    {
        const data = await ghAuth();
    }

    const handleGoogleLogin = async () => 
    {
        const data = await googleAuth();
    }

    return (
        <div>
            <Button onClick = { () => handleFbLogin() }>FLogin</Button>
            <Button onClick = { () => handleGoogleLogin() }>GoogleLogin</Button>
            <Button onClick = { () => handleGhLogin() }>GhLogin</Button>

        </div>
    );
}