import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectActiveWord, selectWords, next ,restart} from './educationSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import {Button} from '@material-ui/core'

const WordImage = styled.img`
width: 400px;
height: 400px;
@media screen and (max-width: 759px)
{
  width:250px;
  height:250px;
}
`;

const WordContent = styled.div`
color:#000;
font-weight: bold;
margin:5px;
`;

const Counter = styled.div`
margin-bottom:10px;
`;
 
const Progress = styled.div`
width:80%;
`;

const Education = () =>
{
    const words = useSelector(selectWords);
    const activeWord = useSelector(selectActiveWord);
    const dispatch = useDispatch();

    const handleNext = () =>
    {
      words[activeWord + 1] ? dispatch(next()) : dispatch(restart())
    }
    return (
        <React.Fragment>
          <Progress>
     <ProgressBar style ={{ width:`${((activeWord + 1) / words.length) *100}%`}}></ProgressBar>
     <Counter>{`${activeWord + 1} / ${words.length}`}</Counter>
          </Progress>
      
    
          <WordImage src ={words[activeWord].img}/>
          <div>
          <WordContent>{words[activeWord].content} - {words[activeWord].translation}</WordContent>
          <Button
          onClick={() => handleNext()}
          >Next</Button>
        </div>
        </React.Fragment>
      );
 

}

export default Education;