import React,{ useState } from 'react';
import FormInput from '../../components/forms/FormInput';
import Submit from '../../components/forms/Submit';
import { auth } from '../../services/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Login = styled(Link)`
    color: #a5a5a5;
    text-decoration: none;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover{
        color: #838383;
    }`;

const Register = () => {

    const [ formValues, setFormValues ] = useState({ email: '', password: '', passwordConfirmation: '' });
    const [ error, setError ] = useState('');

    function handleInputChange(e){
        e.persist();
        setError('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    };

    function handleSubmit (e) {
        e.preventDefault();
        if( formValues.password === formValues.passwordConfirmation )
        {
            auth().createUserWithEmailAndPassword( formValues.email, formValues.password ).catch( err => {
                console.log(err);
                setError(err.message);
            });
        }
        else
        {
            setError(' Password and confirm Password must be identic');
        }
        
    }

    return (
        <div>
        <form onSubmit = { handleSubmit } style = {{ display:'flex',flexDirection: 'column', width: '50vw'}}>
        <FormInput name = 'email' value = { formValues.email } onChange = { handleInputChange } label = "Email" type = 'email' />
        <FormInput name = 'password' value = { formValues.password } onChange = { handleInputChange } label = "Password" type = 'password' />
        <FormInput name = 'passwordConfirmation' value = { formValues.passwordConfirmation } onChange = { handleInputChange } label = "Confirm password" type = 'password' />
        <Submit >Register</Submit>
        { (error) &&  <div style = {{ color: 'red',fontSize: '12px' }}>{error}</div> }
        { (!error) && <div style = {{ height:'30px' }}></div> }
        </form>
        <Login to = '/login'>Do you have account? Login</Login>
        </div>
    )
}

export default Register;
