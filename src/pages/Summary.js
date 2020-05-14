import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import Circular from '../components/Circular';
import { selectPoints, selectScore, selectQuestionsNums, selectInteractiveQuestionsNums } from '../features/excercise/excerciseSlice';
import { selectComunicat } from '../features/auth/authSlice';
import ProgressProvider from '../components/ProgressProvider.js';

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

        const Content = styled.div`
      width:100%;
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 575px`;

const Summary = (props) => {

    const points = useSelector(selectPoints);
    const score = useSelector(selectScore);
    const questionsNums = useSelector(selectQuestionsNums);
    const interactiveQuestionsNums = useSelector(selectInteractiveQuestionsNums);
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
        <>
        <Content>
            <div>Your score : {points} / {questionsNums.length + interactiveQuestionsNums.length}</div>
      <div>{comunicat}</div> 
       <ProgressProvider valueStart={0} valueEnd={score}>
       {value => 
            <Circular
                strokeWidth="20"
                sqSize="300"
                percentage={value}/>}
        </ProgressProvider>
        <EducationBtn onClick = { () => educate() }>Educate</EducationBtn> 
        </Content>
        </>
    )
}

export default Summary;
