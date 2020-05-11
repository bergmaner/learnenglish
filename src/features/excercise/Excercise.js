import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setLevel } from '../auth/authSlice';
import {
    selectQuestionsVisible,
    selectQuestions,
    selectActiveQuestion,
    selectInteractiveQuestions,
    selectActiveInteractiveQuestion,
    selectFinished,
    selectScore,
    finishQuiz,
    fetchExcerciseAsync,
    updateStats,
    setQuestionsVisible
    
     } from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar.js';
import Question from './Question';
import InteractiveQuestion from './InteractiveQuestion';
import Summary from '../../pages/Summary';
import styled from 'styled-components';
import{ useParams, useHistory } from "react-router-dom";

  

  const Content = styled.div`
      width:100%;
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 300px`;

  const Excercise = () =>
{
    const questions = useSelector(selectQuestions);
    const activeQuestion = useSelector(selectActiveQuestion);
    const interactiveQuestions = useSelector(selectInteractiveQuestions);
    const activeInteractiveQuestion = useSelector(selectActiveInteractiveQuestion);
    const questionsVisible = useSelector(selectQuestionsVisible);
    const finished = useSelector(selectFinished);
    const user = useSelector(selectCurrentUser);
    const score = useSelector(selectScore);
    const progress = `${((activeQuestion + activeInteractiveQuestion + 1 )/(questions.length + interactiveQuestions.length)) *100}%`;
    let history = useHistory();
    const { modul } = useParams();
    
    const dispatch = useDispatch();

    React.useEffect( () => 
    {
      if( user && questionsVisible !== undefined )
      {
        dispatch(fetchExcerciseAsync(modul,user));
      }
    },[user] );

    React.useEffect( () => 
    {
      if( activeQuestion > questions.length-1 && questions.length > 0 )
        {
          dispatch( setQuestionsVisible(false) );
        }
      },[activeQuestion] );
 
      React.useEffect( () => 
    {
      
      if( activeInteractiveQuestion > 4 )
        {
          dispatch( finishQuiz() );
          dispatch( setLevel(score) );
        }
      },[activeInteractiveQuestion] );
   
    return (
        
  <Content>
    <Question visible = {questionsVisible} progress = {progress}/>
      <InteractiveQuestion 
        questionsVisible = {questionsVisible}
        finished = {finished}
        progress = {progress}
      />
      <Summary finished = {finished}/>
  </Content>
      );
}

export default Excercise;