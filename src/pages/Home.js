import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const MainButton = styled(Button)`
&&
{
    width: 50vw;
    display: block;
    padding: 15px;
    border: 2px solid #DB7093; 
    color: #DB7093;
    font-weight: 700;
    margin: 5px 0;
    border-radius: 9px;
    &:hover
    {
        background: #DB7093;
        color: #fff;
    }
}
`;

const Home = () => 
{

    const history = useHistory();

    const historyPush = (path) =>
    {
        history.push(path);
    } 
    return(
        <div>
            <MainButton onClick = { () => historyPush('/education') }>Educate</MainButton>
            <MainButton onClick = { () => historyPush('/excercise') }>Excercise</MainButton>
        </div>
    );
}

export default Home;
