import React from 'react';
import { Input, Button } from '@material-ui/core/';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { db } from '../../services/firebase';

export default () => {

  const { register, handleSubmit } = useForm();

  const initialQuestion = {
    content: '',
    correctAnswer: 0,
    difficulty: null,
    answers: [
      { content: ''},
      { content: ''},
      { content: ''},
      { content: ''},
    ]
  }
 
  const [ questions, setQuestions ] = React.useState([initialQuestion]);
  const [ exists, setExists ] = React.useState(false);
  const [ tempQuestions, setTempQuestions ] = React.useState([]);
  const [ tempInteractiveQuestions, setTempInteractiveQuestions ] = React.useState([]);
  const [ modul, setModul ] = React.useState('');
  

  const addQuestion = () => 
  {
    setQuestions([...questions, initialQuestion])
  }

  const removeQuestion = () =>
   {
    const newArr = [...questions];
    newArr.splice(questions.length-1, 1);
    setQuestions(newArr);
  }
  
  const onChange = async (e) => 
  {
    const mdl = e.target.value;
    setModul(mdl);
    await db.collection("excercise").doc(mdl).get().then(function(doc) {
    if (doc.exists)
     {
        setTempQuestions(doc.data().questions);
        setTempInteractiveQuestions(doc.data().interactiveQuestions);
        setExists(true);
        console.log("Document data:", doc.data().questions);
    }
     else 
     {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setExists(false);
    }
}).catch(function(error)
 {
    console.log("Error getting document:", error);
});
     
  }

  const onSubmit = async values =>
   {
    values.questions.map( question => {question.correctAnswer = Number(question.correctAnswer)}).correctAnswer = Number(values.questions[0].correctAnswer);
    values.questions.map(question => {question.difficulty = Number(question.difficulty)});
    if(exists)
    {
    Array.prototype.push.apply(tempQuestions,values.questions);
    await db.collection('excercise').doc(modul).update({
      questions : tempQuestions,
      interactiveQuestions : tempInteractiveQuestions
    });
    }
    else
    {
      await db.collection('excercise').doc(modul).set({
        questions : values.questions,
        interactiveQuestions : tempInteractiveQuestions
      });
    }
  };

const clear = () =>
{
  setQuestions([]);
}

  return(
    <div>
      <p>Utwórz nowe pytanie</p>
     
      <form onSubmit={handleSubmit(onSubmit)} >
      <Input
              fullWidth
              name={`modul`}
              onChange = { (e) => onChange(e) }
              placeholder={`Moduł`} 
              inputProps={{ 'aria-label': `modul` }}
            />
        {questions.map((question, q) =>
          <div key={`questions${q}`}>
            <Input
              fullWidth
              name={`questions[${q}].content`}
              inputRef={register()}
              placeholder={`Pytanie ${q+1}`}
              inputProps={{ 'aria-label': `pytanie ${q+1}` }}
            />
          <Input
          inputRef={register()}
          name={`questions[${q}].difficulty`}
          placeholder={`Trudność`} 
          type = 'number'
          inputProps={{ 'aria-label': `difficulty` }}
        />
             <Input
          inputRef={register()}
          name={`questions[${q}].correctAnswer`}
          placeholder={`Prawidłowa odpowiedź`} 
          type = 'number'
          inputProps={{ 'aria-label': `correctAnswer${q}` }}
        />
            {question.answers.map((answer, a) =>
              <div key={`answer${a}`}>
                <Input
                  name={`questions[${q}].answers[${a}].content`}
                  inputRef={register()}
                  placeholder={`Odp ${a}`}
                  inputProps={{ 'aria-label': `odp ${a}` }}
                />
              </div>
            )}
          </div>
        )}
        <Button onClick={ () => addQuestion() }>Dodaj pytanie</Button>
        <Button onClick={ () => removeQuestion() }>Usuń pytanie</Button>
        <Button onClick={ () => clear() }>Wyczyść</Button>
        <Button type="submit">Utwórz pytania</Button>
      </form>
    </div>
  )
}