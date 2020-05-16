import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemIcon, Checkbox } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectQuestionsVisible,
    selectQuestions,
    selectActiveQuestion,
    selectCheckIndex,
    selectCorrectAnswer,
    nextQuestion,
    setQuestionsVisible,
    toggleCheckbox
        } from './excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import NextBtn from '../../components/NextBtn';
import Message from '../../components/Message';
     
    const AnswersContent = styled.div`
        width:100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 520px`;

    const AnswersList = styled(List)`
        width: 40%;
        @media screen and (max-width: 759px)
        {
            width:100%
        }`;

    const Answer = styled.div`
        width : 100%;`;

    const Title = styled.div`
        padding-top: 50px;
        margin:20px 0;
        width:100%`;

    const Check = styled(Checkbox)`
        svg{
                color: palevioletred;
            }`;
    const Progress = styled.div`
         width:80%;`;

const Question = ( props ) => {

    const questions = useSelector(selectQuestions);
    const activeQuestion = useSelector(selectActiveQuestion);
    const questionsVisible = useSelector(selectQuestionsVisible);
    const checkIndex = useSelector(selectCheckIndex);
    const correctAnswer = useSelector(selectCorrectAnswer);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    
    const onClick = () => {
      if(!open) dispatch( nextQuestion() );
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleToggle = (index) => () => 
    {
      if( checkIndex !== index ) dispatch( toggleCheckbox(index) );
    };

    if( !props.visible) {
        return null;
      }

    return (
        <>
     <Progress>
      <ProgressBar style ={{ width: props.progress }}/>
    </Progress>
    <AnswersContent>
        <Title>{ questions[activeQuestion]?.content }</Title>
            <AnswersList >
            {questions[activeQuestion]?.answers?.map((answer,index) =>
            <ListItem key = {`question-${activeQuestion}-answer-${index}`} dense button onClick = { handleToggle(index) } >
                <ListItemIcon>
                    <Check
                    checked = { answer.checked }
                    tabIndex = {-1}
                    disableRipple
                    onClick = { handleToggle(index) }
                    />
                </ListItemIcon>
            <Answer key = { index }>{ answer.content }</Answer>
            </ListItem>)}
            </AnswersList>
            <NextBtn open = { open } onClick = { onClick } />
            <Message correct = { correctAnswer } open = { open } handleClose = { handleClose } />
    </AnswersContent>
        </>
    )
}

export default Question;
