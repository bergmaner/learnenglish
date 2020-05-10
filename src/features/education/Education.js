import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectActiveWord,
  selectWords,
  next,
  prev,
  fetchEducationAsync,
  goTo
  } from './educationSlice';
import { selectCurrentUser } from '../auth/authSlice';
import { restart } from '../excercise/excerciseSlice';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import{ useParams } from "react-router-dom";
const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color : #c7c7c7;
  font-size: 14px;`;


const Container = styled.div`
width: 100%;
min-height: calc(100vh - 60px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;`;

const ImageWithPagination = styled.div`
  
display: flex;
flex-direction: row;
align-items: center;
height: 420px;
@media screen and (max-width: 959px)
{
height: 380px;
width:100%;
}
  @media screen and (max-width: 759px)
{
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: space-between;
}
@media screen and (max-width: 559px)
{
  height:340px;
}`;

const StyledPaginationItem = styled.div`
  margin: 2px 10px;
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media screen and (max-width: 759px)
{
  width: auto;
  margin: 0;
} `;

const CirclePagination = styled(Pagination)`
&&
{
  padding: 0 50px;
  @media screen and (max-width: 759px)
    {
      padding: 10px 0px;
    }
  ul{
    display:flex;
    flex-direction:column;
    @media screen and (max-width: 759px)
    {
      display: flex;
      flex-direction: row;
      align-items: center; 
    }
  }
  
  & .MuiPaginationItem-ellipsis
  {
    color : palevioletred;
    opacity : 1;
    font-weight:700;
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
}`;

const PaginationText = styled.div`
margin: 0 5px;
text-align : left;
@media screen and (max-width: 759px)
{
  display:none;
}
`;

const Content = styled.div`
display:flex;
flex-direction: row;
align-items : center;
width:100%;
justify-content: space-around;
box-sizng:border-box;
padding-bottom: 5px;
@media screen and (max-width: 959px)
{
  flex-direction: column;
  min-height:440px;
  width: 100%;
  justify-content: space-around;
}`;

const Examples = styled.div`
font-size : 18px;
text-align : left;
padding: 0 15px;
padding-top:60px;
display: flex;
flex-direction: column;
justify-content: flex-start;
height:400px;
box-sizing: border-box;
@media screen and (max-width: 959px)
{
  padding-top: 0;
  height: 90px;
  width: calc(100%-15px);
}
@media screen and (max-width: 759px)
{
  font-size:16px;
  padding-top: 0;
  height: 100px;
}
@media screen and (max-width: 559px)
{
  font-size:14px;
  height: 120px;
}`;

const WordImage = styled.img`
width: 350px;
@media screen and (max-width: 959px)
{
  width: 300px;
}
@media screen and (max-width: 759px)
{
  width: 250px;
}
@media screen and (max-width: 559px)
{
  width: 230px;
}
`;

const WordText = styled.div`
color : #c7c7c7;
font-size:21px;
margin:5px;
@media screen and (max-width: 759px)
{
  font-size:16px;
}`;

const WordContent = styled.div`
width:400px;
height: 410px;
display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-between;
@media screen and (max-width: 959px)
{
  padding:top: 50px;
  height: 350px;
  width: 100%;
  box-sizing: border-box;
}
@media screen and (max-width: 559px)
{
  height:268px;
}`;

const ExcerciseBtn = styled(Button)`
&&
{
    color: #fff;
    display:inline-block;
    background: #CA6082;
    padding:2px;
    height:auto;
    padding:5px 8px;
    font-size: 14px;
    border-radius : 16px;
    &:hover {
      background-color: #DB7093;
    }
}`;

const Counter = styled.div`
margin-bottom:10px;`;
 
const Progress = styled.div`
width: 90%;
font-size: 20px;`;

const ArrowNavigation = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-around;`;

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

const Example = styled.div`
`;

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
    const user = useSelector(selectCurrentUser);
    const activeWord = useSelector(selectActiveWord);
    const history = useHistory();
    const dispatch = useDispatch();
    const { modul } = useParams();
    
    useEffect( () =>
     {
      console.log(modul);
      if( user )
      {
        dispatch(fetchEducationAsync(modul,user));
      }
     
    },[modul,user] )

    const excercise = () =>
    {
      dispatch(restart());
      history.push(`/excercise/${modul}`);
    }

    const updateActualWord = (item) =>
    {
     if(item >= 0 && item <= words.length) dispatch(goTo(item));
    }
    
    
    return (
        <Container>
         { ((words.length > 0 && user && user.level !== -1) ||(words.length > 0 &&  !user)) &&  <>
          <Progress>
          <Counter>{`${activeWord + 1} / ${words.length}`}</Counter>
            <ProgressBar style ={{ width:`${((activeWord + 1) / words.length) *100}%`}}></ProgressBar>
          </Progress>
          <Content>
          <ImageWithPagination>
            <CirclePagination renderItem={(item) => (
                <StyledPaginationItem onClick = { () => updateActualWord(item.page-1) }>
                  <PaginationItem {...item} />
                  <PaginationText>
                    {item.page-1 !== -1 ? words[item.page-1].translation : ''}
                  </PaginationText>
                </StyledPaginationItem>
              )} page = {activeWord + 1} count={words.length} hidePrevButton hideNextButton />
          <WordContent>
          <WordImage src ={words[activeWord].image}/>
          <WordText>{words[activeWord].content} - {words[activeWord].translation}</WordText>
          </WordContent>
          </ImageWithPagination>
          <Examples>
            <Example>
            <span style = {{color : 'palevioletred',fontWeight:700}}>Examples</span>
            <br/>
              <span style= {{fontWeight:700}}>{words[activeWord].exampleTranslation}</span> - {words[activeWord].example}
              </Example>
          </Examples>
          
          </Content>
          
               <ArrowNavigation>
               <Item><Prev onClick = { () => dispatch(prev()) }>&#8249;</Prev></Item>
               {(user) && <>
               <ExcerciseBtn onClick = { () => excercise() }>Excercise</ExcerciseBtn>
               </>}
               { (!user) && <>
               <StyledLink to = '/login'>Zaloguj się aby wykonać ćwiczenia</StyledLink> 
               </>
              }
               <Item><Next onClick = { () => dispatch(next()) }>&#8250;</Next></Item>
               </ArrowNavigation>
              
             
         
          </>}
         {
           (words.length > 0 && user && user.level === -1) &&  <>
           <div style = {{minHeight: 'calc(100vh - 60px)',display : 'flex', justifyContent: 'center', flexDirection : 'column'}}>
          <div style = {{margin: '10px'}}> Sprawdź swój poziom poprzez test </div>
       <div style = {{margin: '10px'}}><ExcerciseBtn onClick = { () => excercise() }>Check your level</ExcerciseBtn></div>
           </div>
           </>
         }
        </Container>
      );
}

export default Education;