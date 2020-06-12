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

  const initialQuestion = {
    content: "",
    correctAnswer: 0,
    difficulty: null,
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
  };

  const [questions, setQuestions] = React.useState([initialQuestion]);
  const [exists, setExists] = React.useState(false);
  const [tempQuestions, setTempQuestions] = React.useState([]);
  const [
    tempInteractiveQuestions,
    setTempInteractiveQuestions,
  ] = React.useState([]);
  const [modul, setModul] = React.useState("");

  const addQuestion = () => {
    setQuestions([...questions, initialQuestion]);
  };

  const removeQuestion = () => {
    const newArr = [...questions];
    newArr.splice(questions.length - 1, 1);
    setQuestions(newArr);
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
          setTempQuestions(doc.data().questions);
          setTempInteractiveQuestions(doc.data().interactiveQuestions);
          setExists(true);
          console.log("Document data:", doc.data().questions);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setExists(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    console.log(questions);
  };

  const onSubmit = async (values) => {
    values.questions.map((question) => {
      question.correctAnswer = Number(question.correctAnswer);
      return question;
    });
    values.questions.map((question) => {
      question.difficulty = Number(question.difficulty);
      return question;
    });
    if (exists) {
      Array.prototype.push.apply(tempQuestions, values.questions);
      await db.collection("excercise").doc(modul).update({
        questions: tempQuestions,
        interactiveQuestions: tempInteractiveQuestions,
      });
    } else {
      await db.collection("excercise").doc(modul).set({
        questions: values.questions,
        interactiveQuestions: tempInteractiveQuestions,
      });
    }
    console.log(questions);
  };

  const clear = () => {
    setQuestions([]);
  };

  return (
    <div>
      <p>Utwórz nowe pytanie</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          fullWidth
          variant="outlined"
          name={`modul`}
          onChange={(e) => onChange(e)}
          placeholder={`Moduł`}
          inputProps={{ "aria-label": `modul` }}
        />
        {questions.map((question, q) => (
          <div key={`questions${q}`}>
            <Input
              fullWidth
              name={`questions[${q}].content`}
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
                marginBottom: "20px",
              }}
            >
              <Input
                inputRef={register()}
                name={`questions[${q}].difficulty`}
                placeholder={`Trudność`}
                type="number"
                inputProps={{ "aria-label": `difficulty` }}
                variant="outlined"
              />
              <Input
                inputRef={register()}
                name={`questions[${q}].correctAnswer`}
                placeholder={`Prawidłowa odpowiedź`}
                type="number"
                inputProps={{ "aria-label": `correctAnswer${q}` }}
                variant="outlined"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {question.answers.map((answer, a) => (
                <div key={`answer${a}`}>
                  <Input
                    name={`questions[${q}].answers[${a}].content`}
                    inputRef={register()}
                    placeholder={`Odp ${a}`}
                    inputProps={{ "aria-label": `odp ${a}` }}
                    variant="outlined"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Submit
          type="button"
          style={{ margin: "0px 5px" }}
          onClick={() => addQuestion()}
        >
          Dodaj pytanie
        </Submit>
        <Submit
          type="button"
          style={{ margin: "0px 5px" }}
          onClick={() => removeQuestion()}
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
      </form>
    </div>
  );
};
