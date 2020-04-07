import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectQuestions,selectActiveQuestion,next} from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

const Progress = styled.div`
width:80%;
`;

const Excercise = () =>
{

    const questions = useSelector(selectQuestions);
    const activeQuestion = useSelector(selectActiveQuestion);
    const dispatch = useDispatch();
    
    const onClick = () =>
    {
        dispatch(next());
    }
   
    return (
       <React.Fragment>
    <Progress>
     <ProgressBar style ={{ width:`50%`}}></ProgressBar>
    </Progress>
    <div>{questions[activeQuestion].content}</div>
    <div>{questions[activeQuestion].answers.map((answer,index) => <div key={index}>{answer.content}</div>)}</div>
    <Button
          onClick = { () => onClick()}
          >Next</Button>
       </React.Fragment>
      );
 

}

export default Excercise;