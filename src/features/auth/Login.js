import React,{ useState } from 'react';
import { FaFacebook,FaGithub,FaGooglePlus } from "react-icons/fa";
import styled from 'styled-components';
import { fbAuth, ghAuth, googleAuth, auth } from '../../services/firebase';
import FormInput from '../../components/forms/FormInput';
import Submit from '../../components/forms/Submit';
import { Link } from 'react-router-dom';
import {Avatar} from '@material-ui/core';

const Register = styled(Link)`
    color: #a5a5a5;
    text-decoration: none;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover{
        color: #838383;
    }
`;

const SocialMedia = styled.div`
    svg{
    font-size : 100px;
    margin : 10px;
    cursor:pointer;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    @media screen and (max-width: 759px)
    {
        font-size : 60px;
        margin : 10px 5px;
    }}
.facebook{
    &:hover
    {
        color: #4267B2;
    }
}
.google{
    &:hover
    {
        color: #dd4b39;
    }
}
.github{
    &:hover
    {
        color: #211F1F;
    }
}`;

export default () =>
{
    const [ formValues, setFormValues ] = useState({ email: '', password: '' });
    const [ error, setError ] = useState('');

    
    function handleSubmit(e){
        e.preventDefault();
        auth().signInWithEmailAndPassword( formValues.email, formValues.password )
        .catch( err => {
            console.log( err );
            setError( err.message );
        });
    }

    function handleInputChange(e){
        e.persist();
        setError('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

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
        <div style = {{ display:'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit = { handleSubmit } style = {{ display:'flex',flexDirection: 'column', width: '50vw'}}>
        <FormInput name = 'email' onChange = { handleInputChange } label = "Email" type = 'email' />
        <FormInput name = 'password' onChange = { handleInputChange } label = "Password" type = 'password' />
        <Submit>Login</Submit>
        { (error) &&  <div style = {{ color: 'red',fontSize: '12px' }}>{error}</div> }
        { (!error) && <div style = {{ height:'30px' }}></div> }
        </form>
        <SocialMedia>
        <FaFacebook className = 'facebook' onClick = { () => handleFbLogin() } ></FaFacebook>
        <FaGooglePlus className = 'google' onClick = { () => handleGoogleLogin()} ></FaGooglePlus>
        <FaGithub className = 'github' onClick = { () => handleGhLogin() } ></FaGithub>
        </SocialMedia>
        <Register to = '/register'>Do you have an account ? If not go Register</Register>
        </div>
    );
}