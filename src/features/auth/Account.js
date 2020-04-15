import React from 'react';
import {Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';


export default () =>
{
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div>
            Hey, {currentUser?.email}
        </div>
    );
}