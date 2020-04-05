import React from 'react';
import {useSelector} from 'react-redux';
import {selectActiveWords} from './educationSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';

const WordImage = styled.img`
width: 400px;
height: 400px;
`;

const WordContent = styled.div`
color:palevioletred;
font-weight: bold;
`;



const Education = () =>
{
    const word = useSelector(selectActiveWords);
    return (
        <React.Fragment>
     <ProgressBar style ={{ width:`${3/5 * 100}%`}}></ProgressBar>
     
  
        <div ><WordImage src ={word.img}/><WordContent>{word.content} - {word.translation}</WordContent></div>
        </React.Fragment>
      );
 

}

export default Education;