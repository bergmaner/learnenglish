import React from "react";
import { TextField } from "@material-ui/core/";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { db } from "../../services/firebase";
import Submit from "../../components/forms/Submit";

const Input = styled(TextField)`
  .MuiOutlinedInput-root {
    margin-bottom: 20px;
    color: #a5a5a5;
    fieldset {
      border-color: palevioletred;
    }
    &:hover fieldset {
      border: 2px solid palevioletred;
    }
    &.Mui-focused fieldset {
      border-color: palevioletred;
    }
  }
  .MuiFormLabel-root {
    color: #a5a5a5;
  }
  .MuiFormLabel-root.Mui-focused {
    color: palevioletred;
  }
`;

export default () => {
  const { register, handleSubmit } = useForm();

  const initialInteractiveQuestion = {
    content: "",
    correctAnswer: "",
    difficulty: 0,
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
  };

  const [interactiveQuestions, setInteractiveQuestions] = React.useState([
    initialInteractiveQuestion,
  ]);
  const [exists, setExists] = React.useState(false);
  const [
    tempInteractiveQuestions,
    setTempInteractiveQuestions,
  ] = React.useState([]);
  const [tempQuestions, setTempQuestions] = React.useState([]);
  const [modul, setModul] = React.useState("");

  const addInteractiveQuestion = () => {
    setInteractiveQuestions([
      ...interactiveQuestions,
      initialInteractiveQuestion,
    ]);
  };

  const addSlice = (index) => {
    const content = { content: "" };
    let newArr = [...interactiveQuestions];
    newArr[index.q].answers.push(content);
    setInteractiveQuestions(newArr);
  };
  const removeSlice = (index) => {
    let newArr = [...interactiveQuestions];
    newArr[index.q].answers.splice(
      interactiveQuestions[index.q].answers.length - 1,
      1
    );
    setInteractiveQuestions(newArr);
  };

  const removeInteractiveQuestion = () => {
    const newArr = [...interactiveQuestions];
    newArr.splice(interactiveQuestions.length - 1, 1);
    setInteractiveQuestions(newArr);
  };

  const onChange = async (e) => {
    const mdl = e.target.value;
    setModul(mdl);
    await db
      .collection("excercise")
      .doc(mdl)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTempInteractiveQuestions(doc.data().interactiveQuestions);
          setTempQuestions(doc.data().questions);
          setExists(true);
        } else {
          setExists(false);
        }
      })
      .catch(function (error) {
      });
  };

  const onSubmit = async (values) => {
    values.interactiveQuestions.map((int) => {
      int.difficulty = Number(int.difficulty);
      return int;
    });
    const uniq = {};
    const arrFiltered = tempInteractiveQuestions.filter(
      (obj) => !uniq[obj.content] && (uniq[obj.content] = true)
    );
    if (exists) {
      Array.prototype.push.apply(
        tempInteractiveQuestions,
        values.interactiveQuestions
      );
      await db.collection("excercise").doc(modul).update({
        interactiveQuestions: arrFiltered,
        questions: tempQuestions,
      });
    } else {
      await db.collection("excercise").doc(modul).set({
        interactiveQuestions: values.interactiveQuestions,
        questions: tempQuestions,
      });
    }
  };

  const clear = () => {
    setInteractiveQuestions([]);
  };

  return (
    <div>
      <p>Utwórz nowe pytanie</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          fullWidth
          name={`modul`}
          onChange={(e) => onChange(e)}
          placeholder={`Moduł`}
          inputProps={{ "aria-label": `modul` }}
          variant="outlined"
        />
        {interactiveQuestions.map((interactiveQuestion, q) => (
          <div key={`interactiveQuestions${q}`}>
            <Input
              fullWidth
              name={`interactiveQuestions[${q}].content`}
              inputRef={register()}
              placeholder={`Pytanie ${q + 1}`}
              inputProps={{ "aria-label": `pytanie ${q + 1}` }}
              variant="outlined"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Input
                name={`interactiveQuestions[${q}].difficulty`}
                inputRef={register()}
                placeholder={`Trudność`}
                type="number"
                inputProps={{ "aria-label": `difficulty` }}
                variant="outlined"
              />
              <Input
                name={`interactiveQuestions[${q}].winCode`}
                inputRef={register()}
                placeholder="Prawidłowa sekwencja"
                inputProps={{ "aria-label": "correctAnswer" }}
                variant="outlined"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "20px",
              }}
            >
              <Submit type="button" onClick={() => addSlice({ q })}>
                Add answer
              </Submit>
              <Submit type="button" onClick={() => removeSlice({ q })}>
                Remove answer
              </Submit>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {interactiveQuestion.answers.map((slice, s) => (
                <div key={`slices${s}`}>
                  <Input
                    name={`interactiveQuestions[${q}].slices[${s}].content`}
                    inputRef={register()}
                    placeholder={`Kawałek ${s}`}
                    inputProps={{ "aria-label": `odp ${s}` }}
                    variant="outlined"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Submit
            type="button"
            style={{ margin: "0px 5px" }}
            onClick={() => addInteractiveQuestion()}
          >
            Dodaj pytanie
          </Submit>
          <Submit
            type="button"
            style={{ margin: "0px 5px" }}
            onClick={() => removeInteractiveQuestion()}
          >
            Usuń pytanie
          </Submit>
          <Submit
            type="button"
            style={{ margin: "0px 5px" }}
            onClick={() => clear()}
          >
            Wyczyść
          </Submit>
          <Submit style={{ margin: "0px 5px" }} type="submit">
            Utwórz pytania
          </Submit>
        </div>
      </form>
    </div>
  );
};
