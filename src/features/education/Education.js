import React from 'react';
import {useSelector} from 'react-redux';
import {selectWords} from './educationSlice';
const Education = () =>
{
    const words = useSelector(selectWords);
    
return <div>{words.map(word => <div>{word.content} - {word.translation}</div>)}</div>
}

export default Education;