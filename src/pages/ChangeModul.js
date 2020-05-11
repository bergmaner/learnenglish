import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const Header = styled.div`
font-size: 30px;
color: #DB7093;
padding-top: 100px;
font-weight: 700;
@media screen and (max-width: 559px)
{
    font-size: 30px;
}


`;

const CircleButton = styled(Button)`
&&
{
    padding: 50px;
    border: 2px solid #DB7093; 
    color: #DB7093;
    font-weight: 700;
    margin: 10px;
    border-radius: 100%;
    &:hover
    {
        background: #DB7093;
        color: #fff;
    }
    @media screen and (max-width: 759px)
    {
        
        padding: 45px;
    }
    @media screen and (max-width: 559px)
{
    
    padding: 35px;
}
}
`;

const ModulsContainer = styled.div`
display: flex;
align-items: center;
flex-flow: row wrap;
justify-content: space-around;
margin-bottom: 100px;
`;

const ChangeModul = ({ navLinks, type }) => 
{

    const history = useHistory();

    const historyPush = (path) =>
    {
        history.push(path);
    } 
    return(
        <div style = {{height: 'calc(100vh - 60px)',display: 'flex', justifyContent: 'space-around',flexDirection: 'column'}} >
            <Header>Choose modul to { type === 'education' ? "educate" : "excercise" }</Header>
           <ModulsContainer> 
               {navLinks.map( (link,index) => 
                <CircleButton key = { index } onClick = { () => historyPush(`/${type}/${link.text}`) }><Icon style = {{  fontSize: '50px'}}>{link.icon}</Icon></CircleButton>
            )}
            </ModulsContainer>
        </div>
    );
}

export default ChangeModul;
