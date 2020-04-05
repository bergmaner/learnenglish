import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectActiveWord, selectWords, next} from './educationSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import {Button} from '@material-ui/core'

const WordImage = styled.img`
width: 400px;
height: 400px;
`;

const WordContent = styled.div`
color:#000;
font-weight: bold;
`;

 

const Education = () =>
{
    const words = useSelector(selectWords);
    const activeWord = useSelector(selectActiveWord);
    const dispatch = useDispatch();

    const handleNext = () =>
    {
      words[activeWord + 1] ? dispatch(next()) : console.log('f')
    }
    return (
        <React.Fragment>
     <ProgressBar style ={{ width:`${3/5 * 100}%`}}></ProgressBar>
     
  
        <div >
    <div>{`${activeWord + 1} / ${words.length}`}</div>
          <WordImage src ={words[activeWord].img}/>
          <WordContent>{words[activeWord].content} - {words[activeWord].translation}</WordContent>
          <Button
          onClick={() => handleNext()}
          >Next</Button>
        </div>
        </React.Fragment>
      );
 

}

export default Education;