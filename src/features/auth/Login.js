import React from 'react';
import {Button} from '@material-ui/core';
import {fbAuth} from '../../services/firebase';

export default () =>
{
    const handleFbLogin = async () => 
    {
        const data = await fbAuth();
    }


    return (
        <div>
            <Button onClick = { () => handleFbLogin()}>FLogin</Button>
        </div>
    );
}