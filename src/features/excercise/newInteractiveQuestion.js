import React from 'react';
import { Input, Button } from '@material-ui/core/';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { db , firestore } from '../../services/firebase';

export default () => {

  const { register, handleSubmit, errors } = useForm();

  const initialInteractiveQuestion = {
    content: '',
    correctAnswer: '',
    answers: [
      { content: ''},
      { content: ''},
      { content: ''},
      { content: ''},
    ]
  }
 
  const [interactiveQuestions, setInteractiveQuestions] = React.useState([initialInteractiveQuestion]);
  const [exists, setExists] = React.useState(false);
  const [tempInteractiveQuestions, setTempInteractiveQuestions] = React.useState([]);
  const [tempQuestions, setTempQuestions] = React.useState([]);
  const [modul, setModul] = React.useState('');
  

  const addInteractiveQuestion = () => {
    setInteractiveQuestions([...interactiveQuestions, initialInteractiveQuestion])
  }

  const removeInteractiveQuestion = () => {
    const newArr = [...interactiveQuestions];
    newArr.splice(interactiveQuestions.length-1, 1);
    setInteractiveQuestions(newArr);
  }
  
  const onChange = async (e) => 
  {
    const mdl = e.target.value;
    setModul(mdl);
    await db.collection("excercise").doc(mdl).get().then(function(doc) {
    if (doc.exists) {
        setTempInteractiveQuestions(doc.data().interactiveQuestions);
        setTempQuestions(doc.data().questions);
        setExists(true);
        console.log("Document data:", doc.data().interactiveQuestions);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setExists(false);
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
     
  }

  const onSubmit = async values => {
      console.log(exists);
    if(exists)
    {
      const tmp = values.interactiveQuestions;
    Array.prototype.push.apply(tempInteractiveQuestions,tmp);
    await db.collection('excercise').doc(modul).update({
      interactiveQuestions : tempInteractiveQuestions,
      questions : tempQuestions
    });
    }
    else
    {
      await db.collection('excercise').doc(modul).set({
        interactiveQuestions : values.interactiveQuestions,
        questions : tempQuestions
      });
    }
  };

const clear = () =>
{
  setInteractiveQuestions([]);
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
        {interactiveQuestions.map((interactiveQuestion, q) =>
          <div key={`interactiveQuestions${q}`}>
            <Input
              fullWidth
              name={`interactiveQuestions[${q}].content`}
              inputRef={register()}
              placeholder={`Pytanie ${q+1}`}
              inputProps={{ 'aria-label': `pytanie ${q+1}` }}
            />
             <Input
          name={`interactiveQuestions[${q}].winCode`}
          inputRef={register()}
          placeholder="Prawidłowa sekwencja"
          inputProps={{ 'aria-label': 'correctAnswer' }}
        />
            {interactiveQuestion.answers.map((slice, s) =>
              <div key={`slices${s}`}>
                <Input
                  name={`interactiveQuestions[${q}].slices[${s}].content`}
                  inputRef={register()}
                  placeholder={`Kawałek ${s}`}
                  inputProps={{ 'aria-label': `odp ${s}` }}
                />
              </div>
            )}
          </div>
        )}
        <Button onClick={ () => addInteractiveQuestion() }>Dodaj pytanie</Button>
        <Button onClick={ () => removeInteractiveQuestion() }>Usuń pytanie</Button>
        <Button onClick={ () => clear() }>Wyczyść</Button>
        <Button type="submit">Utwórz pytania</Button>
      </form>
    </div>
  )
}