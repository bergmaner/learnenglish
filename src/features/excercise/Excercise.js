import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectQuestionsVisible,
    selectQuestions,
    selectActiveQuestion,
    selectInteractiveQuestions,
    selectActiveInteractiveQuestion,
    selectActiveSlices,
    selectFinished,
    selectPoints,
    nextQuestion,
    nextInteractiveQuestion,
    toggleToSentence,
    toggleCheckbox,
    finishQuiz
     } from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import {Button, List, ListItem, ListItemIcon, Checkbox} from '@material-ui/core';
import {CircularProgressbar} from 'react-circular-progressbar';
import ProgressProvider from '../../components/ProgressProvider';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory } from "react-router-dom";

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
width:80%;
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
min-width:80%;
border-bottom: solid 2px #c7c7c7;
height: 50px;
margin-bottom: 32px;
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
    let history = useHistory();
    const [ hoverIndex, setHoverIndex ] = useState(-1);
    

    const dispatch = useDispatch();

    const onClick = () =>
    {
       if(activeQuestion <= questions.length - 1 && questionsVisible)  
       {
        console.log(`activeQuestion : ${activeQuestion} QuestionsLength : ${questions.length}`);
        dispatch(nextQuestion()) ;

       }
        
       if(activeQuestion >= questions.length - 1) 
        {
           activeInteractiveQuestion < interactiveQuestions.length-1 ? 
           dispatch(nextInteractiveQuestion()) : dispatch(finishQuiz());
        
        }   
    }
    
    const toggleSentence = (index) =>
    {
    dispatch(toggleToSentence(Number(index)));
    setHoverIndex(-1);
    }

    const handleToggle = (index) => () => {
        dispatch(toggleCheckbox(index));
    }
    const educate = () =>
    {
      history.push(`/`);
    }
    return (
        
   <React.Fragment>
       {!finished && <> <Progress>
       <ProgressBar style ={{ width:`${((activeQuestion + activeInteractiveQuestion + (questionsVisible ? 1 :2))/(questions.length + interactiveQuestions.length)) *100}%`}}/>
     </Progress>
    {questionsVisible && <><AnswersContent>
      <Title>{questions[activeQuestion].content}</Title>
        <AnswersList >
    {questions[activeQuestion].answers.map((answer,index) =>
          <ListItem key = {index} dense button onClick={handleToggle(index)}>
            <ListItemIcon>
              <Check
                checked = {answer.checked}
                tabIndex = {-1}
                disableRipple
                onClick = { () => handleToggle(index) }
              />
            </ListItemIcon>
            <Answer key={index}>{answer.content}</Answer>
          </ListItem>)}
    </AnswersList>
   
    </AnswersContent>
    </> }
    {!questionsVisible && <>
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
     <div>
       <ProgressProvider valueStart={0} valueEnd={(points) / (questions.length + interactiveQuestions.length) * 100}>
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