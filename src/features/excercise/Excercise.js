import React, {useState} from 'react';
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

const Progress = styled.div`
width:80%;`;

const Title = styled.div`
margin:20px;`;

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
    width:60vw;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    @media screen and (max-width: 759px)
    {
        width:80vw;
    }`;
const Check = styled(Checkbox)`
svg{
    color: palevioletred;
  }`;

const AnswersContent = styled.div`
width: 350px;
height: 300px`;

const InteractiveContent = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
height: 300px`;

const Answer = styled.div`
text-align : center;
width : 60%;`;

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

    return (
        
       <React.Fragment>
           {!finished && <>
    <Progress>
     <ProgressBar style ={{ width:`${((activeQuestion + activeInteractiveQuestion + (questionsVisible ? 1 :2))/(questions.length + interactiveQuestions.length)) *100}%`}}></ProgressBar>
    </Progress>
    {questionsVisible && <>
    <AnswersContent>
    <Title>{questions[activeQuestion].content}</Title>
    <List >
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
    </List>
   
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
       
        {(points) / (questions.length + interactiveQuestions.length) * 100}%
       
     </>}
       </React.Fragment>
      );
 

}

export default Excercise;