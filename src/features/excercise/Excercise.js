import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectQuestions,
    selectActiveQuestion,
    selectInteractiveQuestions,
    selectActiveInteractiveQuestion,
    nextQuestion,
    nextInteractiveQuestion,
    selectQuestionsVisible,
    toggleToSentence,
    selectActiveSlices} from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

const Progress = styled.div`
width:80%;
`;
const Title = styled.div`
margin:20px;
`;

const WordSlice = styled.span`
border-radius: 16px;
background:#c7c7c7;
color:transparent;
padding:5px;
font-size:18px;
margin:10px;
border: solid 2px #c7c7c7;
user-select: none;
`;

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
    }
   
`;
const WordsContent = styled.div`
    width:60vw;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    @media screen and (max-width: 759px)
    {
        width:80vw;
    }
`;

const SliceContainer = styled.div`
border-bottom: solid 2px #c7c7c7;
height:50px;
margin-bottom:32px;
`;
const Excercise = () =>
{

    const questions = useSelector(selectQuestions);
    const activeQuestion = useSelector(selectActiveQuestion);
    const interactiveQuestions = useSelector(selectInteractiveQuestions);
    const activeInteractiveQuestion = useSelector(selectActiveInteractiveQuestion);
    const questionsVisible = useSelector(selectQuestionsVisible);
    const activeSlices = useSelector(selectActiveSlices);
    const [ hoverIndex, setHoverIndex ] = useState(-1);
    

    const dispatch = useDispatch();

    const onClick = () =>
    {
       if(questions[activeQuestion+1])  
        dispatch(nextQuestion()) 
        else
        {
           if(interactiveQuestions[activeInteractiveQuestion + 1])
           {
            dispatch(nextInteractiveQuestion());
           }
        }   
    }
   const toggleSentence = (index) =>
   {
    dispatch(toggleToSentence(Number(index)));
    setHoverIndex(-1);
   }
    return (
       <React.Fragment>
    <Progress>
     <ProgressBar style ={{ width:`${((activeQuestion + activeInteractiveQuestion + (questionsVisible ? 1 :2))/(questions.length + interactiveQuestions.length)) *100}%`}}></ProgressBar>
    </Progress>
    {
    questionsVisible ?
    <div>
    <Title>{questions[activeQuestion].content}</Title>
    <div>{questions[activeQuestion].answers.map((answer,index) => <div key={index}>{answer.content}</div>)}</div>
    </div>
: 
<div>
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
    </div>
}
    <Button onClick = { () => onClick()} >Next</Button>
       </React.Fragment>
      );
 

}

export default Excercise;