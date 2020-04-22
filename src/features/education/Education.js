import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveWord, selectWords, next ,prev,fetchEducationAsync } from './educationSlice';
import { restart } from '../excercise/excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import{ useParams } from "react-router-dom";


const CirclePagination = styled(Pagination)`
&&
{
  width:200px;
  ul{
    display:flex;
    flex-direction:column;
  }
  
  & .MuiPaginationItem-ellipsis
  {
    color : palevioletred;
    font-size : 18px;
  }
  & .Mui-selected
  {
    opacity:1;
    background:palevioletred;
    
    &:hover
    {
      cursor : default;
      background:palevioletred;
    }
  }

 button
  {
   
   background:palevioletred;
   color: #fff;
   opacity: 0.2;
  
   
   &:hover
   {
     opacity:1;
   }
  
  }
  li > div
  {
    color: #c7c7c7;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight : 700;
    font-size : 18px; 
  }
}
`;

const Content = styled.div`
display:flex;
flex-direction:rows;
align-items : center;
height:400px;
width:100%;
justify-content: space-around;
`;

const Examples = styled.div`
font-size : 18px;
text-align : left;
padding: 0 15px;
height:100%;
`;

const WordImage = styled.img`
width: 350px;
@media screen and (max-width: 759px)
{
  width:250px;
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
    const history = useHistory();
    const dispatch = useDispatch();
    const {modul} = useParams();

    useEffect( () =>
     {
      console.log(modul);
      dispatch(fetchEducationAsync(modul));
    },[modul] )

    const excercise = () =>
    {
      dispatch(restart());
      history.push(`/excercise/${modul}`);
    }
    
    
    return (
        <React.Fragment>
          {words.length > 0 && <>
          <Progress>
          <Counter>{`${activeWord + 1} / ${words.length}`}</Counter>
            <ProgressBar style ={{ width:`${((activeWord + 1) / words.length) *100}%`}}></ProgressBar>
          </Progress>
          <Content>
            <CirclePagination renderItem={(item) => (
                <div style = {{ margin:'2px 10px', width : '200px',display:'flex',flexDirection : 'row',alignitems : 'flex-start' }}><PaginationItem {...item} /><div style = {{margin: '0 5px',textAlign : 'left'}}>{item.page-1 !== -1 ?words[item.page-1].translation : ''}</div></div>
              )} page = {activeWord + 1} count={words.length} hidePrevButton hideNextButton />
          <div style= {{width :'400px'}}>
          <WordImage src ={words[activeWord].image}/>
          <WordContent>{words[activeWord].content} - {words[activeWord].translation}</WordContent>
          </div>
          <Examples>
            <span style = {{color : 'palevioletred',fontWeight:700}}>Examples</span>
            <br/><br/>
          <span style= {{fontWeight:700}}>{words[activeWord].exampleTranslation}</span> - {words[activeWord].example}
          </Examples>
          </Content>
          <ArrowNavigation>
          <Item><Prev onClick = { () => dispatch(prev()) }>&#8249;</Prev></Item>
          <ExcerciseBtn onClick = { () => excercise() }>Excercise</ExcerciseBtn>
          <Item><Next onClick = { () => dispatch(next()) }>&#8250;</Next></Item>
          </ArrowNavigation>
          </>}
        </React.Fragment>
      );
}

export default Education;