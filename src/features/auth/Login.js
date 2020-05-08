import React from 'react';
import { FaFacebook,FaGithub,FaGooglePlus } from "react-icons/fa";
import styled from 'styled-components';
import {fbAuth} from '../../services/firebase';
import {ghAuth} from '../../services/firebase';
import {googleAuth} from '../../services/firebase';
import {Avatar} from '@material-ui/core';

const Facebook = styled(FaFacebook)`
font-size : 100px;
margin : 10px;
cursor:pointer;
&:hover
{
    color : #3b5998;
}

`;
const Github = styled(FaGithub)`
font-size : 100px;
margin : 10px;
cursor:pointer;
&:hover
{
    color : #24292e;
}
`;
const Google = styled(FaGooglePlus)`
font-size : 100px;
margin : 10px;
cursor:pointer;
&:hover
{
    color : #dd4b39;
}
`;

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
            zzz
        <Facebook onClick = { () => handleFbLogin() } />
        <Google onClick = { () => handleGoogleLogin()} />
        <Github onClick = { () => handleGhLogin() } />
      
           

        </div>
    );
}