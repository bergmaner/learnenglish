import React,{useState} from 'react';
import { Input, Button } from '@material-ui/core/';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { db, storage } from '../../services/firebase';

export default () => {

  const { register, handleSubmit} = useForm();

  const initialEducation = {
    content: '',
    translation: '',
    image:'ss'
    
  }
 
  const [ education, setEducation ] = useState([initialEducation]);
  const [ exists, setExists ] = useState(false);
  const [ tempEducation, setTempEducation ] = useState([]);
  const [ modul, setModul ] = useState('');
  const [ image, setImage ] = useState(null);
  const [ url, setUrl ] = useState('');
  const [ progress, setProgress ] = useState(0);




  const addEducation = () => {
    setEducation([...education, initialEducation])
  }

  const removeEducation = () => {
    const newArr = [...education];
    newArr.splice(education.length-1, 1);
    setEducation(newArr);
  }
  
  const onChange = async (e) => 
  {
    const mdl = e.target.value;
    setModul(mdl);
    await db.collection("education").doc(mdl).get().then(function(doc) {
    if (doc.exists) {
        setTempEducation(doc.data().education);
        setExists(true);
        console.log("Document data:", doc.data().education);
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
    if(exists)
    {
      console.log(`if`);
      const tmp = values.education;
      tmp[0].image = url;
      console.log(tmp);
    Array.prototype.push.apply(tempEducation,tmp);
    await db.collection('education').doc(modul).update({
      education : tempEducation
    });
    }
    else
    {
      console.log(`else`);
      const tmp = values.education;
      tmp[0].image = url;
      await db.collection('education').doc(modul).set({
        education : tmp
      });
    }
  };

const clear = () =>
{
  setEducation([]);
}
const handleChange = (e) =>
{
  const file = e.target.files[0];
  if(file)
  { 
    const fileType = file['type'];
    const validImageTypes = ['image/gif','image/jpeg','image/png'];
    if(validImageTypes.includes(fileType))
    {
      setImage(e.target.files[0]);
    }
  }
}
const handleUpdate = (index) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
  
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        error => {
          
          console.log(error);
        },
        () => {
       
          storage
            .ref("images")
            .child(image.name) 
            .getDownloadURL() 
            .then(url => {
              console.log(url);
              setUrl(url);
              let newArr = [...education];
              newArr[index].image = url;
              setEducation(newArr);
              setProgress(0);
            });
        }
      );
    } 
  };
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
        {education.map((edc, index) =>
          <div key={`education${index}`}>
            <Input
              fullWidth
              name={`education[${index}].content`}
              inputRef={register()}
              placeholder={`Słowo ${index+1}`}
              inputProps={{ 'aria-label': `słowo ${index+1}` }}
            />
             <Input
          fullWidth
          name={`education[${index}].translation`}
          inputRef={register()}
          placeholder="Tłumaczenie"
          inputProps={{ 'aria-label': 'translation' }}
        />
        <div >
          {
          //it will be progressbar when i am gonna style it 
}
        <Input
        name={`education[${index}].image`}
        type ='file'
        onChange = {(e) => handleChange(e)}
        />
        <Button onClick ={() => handleUpdate(index)}>update</Button>
        {
          url ? <img width='200px' height = '200px' src = {edc.image}  /> : <img width='200' height = '200'/>
        }
        </div>
          </div>
        )}
        <Button onClick={ () => addEducation() }>Dodaj słowo</Button>
        <Button onClick={ () => removeEducation() }>Usuń słowo</Button>
        <Button onClick={ () => clear() }>Wyczyść</Button>
        <Button type="submit">Utwórz słowa</Button>
      </form>
    </div>
  )
}