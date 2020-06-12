import React, { useState } from "react";
import { Input, Button } from "@material-ui/core/";
import { useForm } from "react-hook-form";
import { db, storage } from "../../services/firebase";

export default () => {
  const { register, handleSubmit } = useForm();

  const initialEducation = {
    content: "",
    translation: "",
    image: "",
    example: "",
    exampleTranslation: "",
    difficulty: 0,
  };

  const [education, setEducation] = useState([initialEducation]);
  const [exists, setExists] = useState(false);
  const [tempEducation, setTempEducation] = useState([]);
  const [modul, setModul] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const addEducation = () => {
    setEducation([...education, initialEducation]);
  };

  const removeEducation = () => {
    const newArr = [...education];
    newArr.splice(education.length - 1, 1);
    setEducation(newArr);
  };

  const onChange = async (e) => {
    const mdl = e.target.value;
    setModul(mdl);
    await db
      .collection("education")
      .doc(mdl)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTempEducation(doc.data().education);
          setExists(true);
          console.log("Document data:", doc.data().education);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setExists(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const onSubmit = async (values) => {
    values.education.map((edc) => {
      edc.difficulty = Number(edc.difficulty);
      return edc;
    });
    values.education.map((edc, index) => (edc.image = education[index].image));
    console.log(values.education);
    const uniq = {};
    const arrFiltered = tempEducation.filter(
      (obj) => !uniq[obj.content] && (uniq[obj.content] = true)
    );
    console.log(arrFiltered);
    if (exists) {
      Array.prototype.push.apply(tempEducation, values.education);
      await db.collection("education").doc(modul).update({
        education: arrFiltered,
      });
    } else {
      await db.collection("education").doc(modul).set({
        education: values.education,
      });
    }
  };

  const clear = () => {
    setEducation([]);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setImage(e.target.files[0]);
      }
    }
  };
  const handleUpdate = (index) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
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
  return (
    <div>
      <p>Utwórz nowe słowa</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          fullWidth
          name={`modul`}
          onChange={(e) => onChange(e)}
          placeholder={`Moduł`}
          inputProps={{ "aria-label": `modul` }}
        />
        {education.map((edc, index) => (
          <div key={`education${index}`}>
            <Input
              fullWidth
              name={`education[${index}].content`}
              inputRef={register()}
              placeholder={`Słowo ${index + 1}`}
              inputProps={{ "aria-label": `słowo ${index + 1}` }}
            />
            <Input
              fullWidth
              name={`education[${index}].translation`}
              inputRef={register()}
              placeholder={`Tłumaczenie ${index + 1}`}
              inputProps={{ "aria-label": `translation ${index + 1}` }}
            />
            <Input
              fullWidth
              name={`education[${index}].example`}
              inputRef={register()}
              placeholder={`Przykład `}
              inputProps={{ "aria-label": `example` }}
            />
            <Input
              fullWidth
              name={`education[${index}].exampleTranslation`}
              inputRef={register()}
              placeholder="Tłumaczenie"
              inputProps={{ "aria-label": "exampleTranslation" }}
            />
            <Input
              type="number"
              name={`education[${index}].difficulty`}
              inputRef={register()}
              placeholder="Trudność"
              inputProps={{ "aria-label": "difficulty" }}
            />
            <div>
              {
                //it will be progressbar when i am gonna style it
              }
              <Input
                name={`education[${index}].image`}
                type="file"
                onChange={(e) => handleChange(e)}
              />
              <Button onClick={() => handleUpdate(index)}>update</Button>
              {url ? (
                <img alt="" width="350px" src={edc.image} />
              ) : (
                <img alt="" width="350" height="200" />
              )}
            </div>
          </div>
        ))}
        <Button type="button" onClick={() => addEducation()}>
          Dodaj słowo
        </Button>
        <Button type="button" onClick={() => removeEducation()}>
          Usuń słowo
        </Button>
        <Button type="button" onClick={() => clear()}>
          Wyczyść
        </Button>
        <Button type="submit">Utwórz słowa</Button>
      </form>
    </div>
  );
};
