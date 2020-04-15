import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {selectActiveWord,selectActiveModul, selectWords, next ,prev} from './educationSlice';
import {changeActivModul} from '../excercise/excerciseSlice';
import Icon from '@material-ui/core/Icon';
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

color : #c7c7c7;
font-size:21px;
margin:5px;
`;

const ExcerciseBtn = styled(Button)`
&&
{
    color: #fff;
    display:inline-block;
    background: #CA6082;
    font-size: 14px;
    border-radius : 16px;
    &:hover {
      background-color: #DB7093;
    }
}`;

const Counter = styled.div`
margin-bottom:10px;
`;
 
const Progress = styled.div`
width:80%;
`;

const ArrowNavigation = styled.div`
width:100%;
display:flex;
flex-direction: row;
justify-content: center;
align-items: center
`;

const Prev = styled.div`
background-color: #ddd;
cursor:pointer;
color: #888;
width : 20px;
border-radius : 100%;
padding :5px 16px 9px 16px;
font-size:24px;
margin : 0 20px;
&:hover
{
  background-color: #ccc;
  color: #222;
}`;

const Item = styled.div`
flex: 1 0 21%;
display:flex;
justify-content: center;
margin: 5px;`;

const Next = styled.div`
background-color: #ddd;
cursor:pointer;
color: #888;
width : 20px;
border-radius : 100%;
padding :5px 16px 9px 16px;
font-size:24px;
margin : 0 20px;
&:hover
{
  background-color: #ccc;
  color: #222;
}`;

const Education = () =>
{
    const words = useSelector(selectWords);
    const activeWord = useSelector(selectActiveWord);
    const activeModul = useSelector(selectActiveModul);
    const history = useHistory();
    const dispatch = useDispatch();

    const excercise = () =>
    {
      dispatch(changeActivModul(activeModul));
      history.push('/excercise');
    }
    
    
    return (
        <React.Fragment>
          <Progress>
          <Counter>{`${activeWord + 1} / ${words.length}`}</Counter>
            <ProgressBar style ={{ width:`${((activeWord + 1) / words.length) *100}%`}}></ProgressBar>
           
          </Progress>
      
    
          <WordImage src ={words[activeWord].img}/>
          <WordContent>{words[activeWord].content} - {words[activeWord].translation}</WordContent>
          <ArrowNavigation>
          <Item><Prev onClick = { () => dispatch(prev()) }>&#8249;</Prev></Item>
          <ExcerciseBtn onClick = { () => excercise() }>Excercise</ExcerciseBtn>
          <Item><Next onClick = { () => dispatch(next()) }>&#8250;</Next></Item>
          </ArrowNavigation>
        </React.Fragment>
      );
 

}

export default Education;