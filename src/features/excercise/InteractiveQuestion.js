import React,{ useState } from 'react';
import styled from 'styled-components';
import { 
    selectInteractiveQuestions,
    selectActiveSlices,
    selectActiveInteractiveQuestion,
    toggleToSentence,
    nextInteractiveQuestion 
        } from './excerciseSlice';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../../components/ProgressBar';
import NextBtn from '../../components/NextBtn';

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
    const InteractiveContent = styled.div`
        width:100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 520px`;

    const SliceContainer = styled.div`
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-wrap: wrap;
        min-height:120px;
    `;
    const Title = styled.div`
        padding-top: 50px;
        margin:20px 0;
        width:100%`;

const InteractiveQuestion = (props) => {

    const [ hoverIndex, setHoverIndex ] = useState(-1);
    const interactiveQuestions = useSelector(selectInteractiveQuestions);
    const activeInteractiveQuestion = useSelector(selectActiveInteractiveQuestion);
    const activeSlices = useSelector(selectActiveSlices);
    const dispatch = useDispatch();
    

    const onClick = ( ) => {
        dispatch( nextInteractiveQuestion() );
    }

    const toggleSentence = ( index ) =>
    {
    dispatch( toggleToSentence( Number(index) ) );
    setHoverIndex(-1);
    };

    if( ( props.questionsVisible || props.questionsVisible === null ) || activeInteractiveQuestion > 4 )
    {
        return null;
    }

    return (
        <>
        <div style = {{width: '80%' }}>
        <ProgressBar style ={{ width: props.progress }}/>
        </div>
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
            <NextBtn onClick = { onClick } />
        </InteractiveContent>
        </>
    )
}

export default InteractiveQuestion;
