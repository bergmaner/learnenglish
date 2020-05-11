import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { selectPoints, selectScore, selectQuestions, selectInteractiveQuestions } from '../features/excercise/excerciseSlice';
import { selectComunicat } from '../features/auth/authSlice';
import ProgressProvider from '../components/ProgressProvider.js';


    const CircleBar = styled(CircularProgressbar)`
    text
    {
        transform: translateX(5px)
    }
    
        @media screen and (max-width: 759px)
        {
            width:60%;
        }`;

    const EducationBtn = styled.button`
        color: #fff;
        background: #CA6082;
        font-size: 14px;
        padding: 10px 16px;
        cursor : pointer;
        outline: none;
        min-width: 64px;
        border-radius: 16px;
        border: none;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        user-select: none;
        &:hover
        {
            background:#DB7093;
        }`;

const Summary = (props) => {

    const points = useSelector(selectPoints);
    const score = useSelector(selectScore);
    const questions = useSelector(selectQuestions);
    const interactiveQuestions = useSelector(selectInteractiveQuestions);
    const comunicat = useSelector(selectComunicat);
    const { modul } = useParams();
    let history = useHistory();

    const educate = () =>
    {
      history.push(`/education/${modul}`);
    };

    if(!props.finished)
    {
        return null;
    }
    return (
        <div>
            <div>Your score : {points} / {questions.length + interactiveQuestions.length}</div>
      <div>{comunicat}</div>
      <div>
          {score}
       <ProgressProvider valueStart={0} valueEnd={score}>
       {value => 
        <CircleBar
        value = {value} 
        text = {`${value}%`}
        styles = {{
          root: {
            transition: 'all 0.5s ease 0s ',
            transitionDelay: '0.1s'
          },
          path: {
            stroke: 'palevioletred',
            strokeLinecap: 'butt',
            
          },
          trail: {
            stroke: '#d6d6d6',
          },
          text: {
            fill: 'palevioletred',
            fontSize: '30px',
         
          },
          background: {
            fill: '#3e98c7',
          }
          }}/>}
        </ProgressProvider>
        </div>
        <EducationBtn onClick = { () => educate() }>Educate</EducationBtn> 
        </div>
    )
}

export default Summary;
