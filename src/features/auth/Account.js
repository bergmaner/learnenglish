import React from 'react';
import {Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import  Line  from '../../components/Chart'

export default () =>
{
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div style ={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column'}}>
            <img style = {{display:'block',borderRadius: '100%'}} src ={currentUser.img}/>
            {currentUser?.name}
            <Line/>
        </div>
    );
}