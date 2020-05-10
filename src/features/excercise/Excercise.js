import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectComunicat, setLevel } from '../auth/authSlice';
import {
    selectQuestionsVisible,
    selectQuestions,
    selectActiveQuestion,
    selectInteractiveQuestions,
    selectActiveInteractiveQuestion,
    selectActiveSlices,
    selectFinished,
    selectPoints,
    selectScore,
    selectCheckIndex,
    nextQuestion,
    nextInteractiveQuestion,
    toggleToSentence,
    toggleCheckbox,
    finishQuiz,
    fetchExcerciseAsync,
    updateStats
    
     } from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import { Button, List, ListItem, ListItemIcon, Checkbox } from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressProvider from '../../components/ProgressProvider';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory } from "react-router-dom";
import{ useParams } from "react-router-dom";

const Progress = styled.div`
width:80%;`;

const Title = styled.div`
margin:20px 0;
width:100%`;

const WordSlice = styled.span`
border-radius: 16px;
background:#c7c7c7;
color:transparent;
padding:5px;
font-size:18px;
margin:10px;
border: solid 2px #c7c7c7;
user-select: none;`;

const Word = styled.span`
    background: none;
    color : #c7c7c7;
    font-size:18px;
    border-radius: 16px;
    padding:5px;
    margin:10px;
    border: solid 2px #c7c7c7;
    cursor:pointer;
    &.active
    {
        background: #ddd;
        border: solid 2px #b6b6b6;
        color: #b6b6b6;
    }`;

const WordsContent = styled.div`
    width:60%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    @media screen and (max-width: 759px)
    {
        width:80%;
    }`;

const Check = styled(Checkbox)`
svg{
    color: palevioletred;
  }`;

const AnswersContent = styled.div`
width:100%;
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
height: 300px`;

const AnswersList = styled(List)`
width: 40%;
@media screen and (max-width: 759px)
    {
      width:100%
    }`;

const InteractiveContent = styled.div`
width:100%;
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
height: 300px`;

const Answer = styled.div`
width : 100%;`;

const SliceContainer = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    min-height:120px;
    `;

const NextBtn = styled(Button)`
&&
{
    color: #c7c7c7;
    font-size: 14px;
    border : solid 2px #c7c7c7; 
    border-radius : 16px;
}`;

const CircleBar = styled(CircularProgressbar)`
@media screen and (max-width: 759px)
    {
        width:60%;
    }
`;

const EducationBtn = styled.button`
    color: #fff;
    background: #CA6082;
    font-size: 14px;
    padding: 10px 16px;
    cursor : pointer;
    outline: none;
    min-width: 64px;
    border-radius: 16px;
    border : none;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    user-select: none;
    &:hover
    {
      background:#DB7093;
    }
    `;

const Excercise = () =>
{
    const questions = useSelector(selectQuestions);
    const activeQuestion = useSelector(selectActiveQuestion);
    const interactiveQuestions = useSelector(selectInteractiveQuestions);
    const activeInteractiveQuestion = useSelector(selectActiveInteractiveQuestion);
    const questionsVisible = useSelector(selectQuestionsVisible);
    const activeSlices = useSelector(selectActiveSlices);
    const finished = useSelector(selectFinished);
    const points = useSelector(selectPoints);
    const score = useSelector(selectScore);
    const user = useSelector(selectCurrentUser);
    const comunicat = useSelector(selectComunicat);
    const checkIndex = useSelector(selectCheckIndex);
    let history = useHistory();
    const { modul } = useParams();
    const [ hoverIndex, setHoverIndex ] = useState(-1);
    const dispatch = useDispatch();

    React.useEffect( () => 
    {
      if(user)
      {
        dispatch(fetchExcerciseAsync(modul,user));
      }
    },[user] );

    const handleToggle = (index) => () => 
    {
      if( checkIndex !== index ) dispatch(toggleCheckbox(index));
    };

    const onClick = () =>
    {
       if(activeQuestion <= questions.length - 1 && questionsVisible) dispatch( nextQuestion() ) ;
       if(activeQuestion >= questions.length - 1) 
        {
           if( activeInteractiveQuestion < interactiveQuestions.length-1 ) 
           {
            dispatch( nextInteractiveQuestion() );
           }
           else
           {
            dispatch( finishQuiz() );
            dispatch( setLevel(score) );
           
           } 
        }   
    };
    
    const toggleSentence = (index) =>
    {
    dispatch(toggleToSentence(Number(index)));
    setHoverIndex(-1);
    };

    
    const educate = () =>
    {
      history.push(`/education/${modul}`);
    };
    return (
        
   <React.Fragment>
       
       {!finished && <> 
       <Progress>
       <ProgressBar style ={{ width:`${((activeQuestion + activeInteractiveQuestion + (questionsVisible ? 1 :2))/(questions.length + interactiveQuestions.length)) *100}%`}}/>
     </Progress>
    {questionsVisible === true && <>
    <AnswersContent>
     <Title>{questions[activeQuestion]?.content}</Title>
        <AnswersList >
    {questions[activeQuestion]?.answers?.map((answer,index) =>
          <ListItem key = {`question-${activeQuestion}-answer-${index}`} dense button onClick = { handleToggle(index) } >
            <ListItemIcon>
              <Check
                checked = {answer.checked}
                tabIndex = {-1}
                disableRipple
                onClick = { handleToggle(index) }
              />
            </ListItemIcon>
            <Answer key={index}>{answer.content}</Answer>
          </ListItem>)}
    </AnswersList>
   
    </AnswersContent>
    </> }
    {questionsVisible === null && <>
      <AnswersContent>
      Loading...
      {
      //it will be loader
       }
      </AnswersContent>

    </>}
    {questionsVisible === false && <>
<InteractiveContent>
    <Title>{interactiveQuestions[activeInteractiveQuestion].content}</Title>
    <SliceContainer>{
    activeSlices.map((id) => 
    interactiveQuestions[activeInteractiveQuestion].slices[id].checked ? <Word 
     className = {hoverIndex === id ? 'active' : ''} 
     onClick = {() => toggleSentence(id)}
     onMouseEnter = {() => setHoverIndex(id)}
     onMouseLeave = { () => setHoverIndex(-1) } 
     key={id}>{ interactiveQuestions[activeInteractiveQuestion].slices[id].content}</Word> : '')}
     </SliceContainer>
    <WordsContent>{interactiveQuestions[activeInteractiveQuestion].slices.map((slice,index) => 
    
     !slice.checked ? <Word className = {hoverIndex === index ? 'active' : ''}
     onClick = {() => toggleSentence(index)}
     onMouseEnter = {() => setHoverIndex(index)}
     onMouseLeave = { () => setHoverIndex(-1) } 
    key={index}>{slice.content}</Word> : <WordSlice key={index}>{slice.content}</WordSlice>)}
     </WordsContent>
    </InteractiveContent>
 </>}
    <NextBtn onClick = { () => onClick()} >Next</NextBtn>
    </>}
     { finished && <>
     <div>Your score : {points} / {questions.length + interactiveQuestions.length}</div>
     <div>{comunicat}</div>
     <div>
       <ProgressProvider valueStart={0} valueEnd={score}>
       {value => 
        <CircleBar
        value = {value} 
        text={`${value}%`}
        styles={{
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
        
  </>}
       </React.Fragment>
      );
 

}

export default Excercise;