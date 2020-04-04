import React from 'react';
import {useSelector} from 'react-redux';
import {selectActiveWords} from './educationSlice';

const Education = () =>
{
    const word = useSelector(selectActiveWords);
    
return <div className = 'edc'><img src ={word.img}/><div>{word.content} - {word.translation}</div></div>

}

export default Education;