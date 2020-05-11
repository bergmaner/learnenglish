import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Next = styled(Button)`
&&
{
    color: #c7c7c7;
    font-size: 14px;
    border : solid 2px #c7c7c7; 
    border-radius : 16px;
}`;

const NextBtn = ({ onClick }) => {
    return (
        <Next onClick = { onClick } >Next</Next>
    )
}

export default NextBtn;
