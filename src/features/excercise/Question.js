import React, { useState } from "react";
import styled from "styled-components";
import { List, ListItem, ListItemIcon, Checkbox } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQuestionsVisible,
  selectQuestions,
  selectActiveQuestion,
  selectCheckIndex,
  selectCorrectAnswer,
  nextQuestion,
  toggleCheckbox,
} from "./excerciseSlice";
import Slide from "../../animations/Slide";
import Fade from "../../animations/Fade";
import ProgressBar from "../../components/ProgressBar";
import NextBtn from "../../components/NextBtn";
import Message from "../../components/Message";

const AnswersContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 520px;
`;

const AnswersList = styled(List)`
  width: 40%;
  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Answer = styled.div`
  width: 100%;
`;

const Title = styled.div`
  padding-top: 50px;
  margin: 20px 0;
  width: 100%;
`;

const Check = styled(Checkbox)`
  svg {
    color: palevioletred;
  }
`;

const Question = ({ visible, progress }) => {
  const questions = useSelector(selectQuestions);
  const activeQuestion = useSelector(selectActiveQuestion);
  const checkIndex = useSelector(selectCheckIndex);
  const correctAnswer = useSelector(selectCorrectAnswer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(true);

  const handleClick = () => {
    if (!open) {
      dispatch(nextQuestion());
      setOn(!on);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (index) => () => {
    if (checkIndex !== index) dispatch(toggleCheckbox(index));
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Fade width={90}>
        <ProgressBar style={{ width: progress }} />
      </Fade>
      <AnswersContent>
        <Slide key={on} width={100}>
          <Title>{questions[activeQuestion]?.content}</Title>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AnswersList>
              {questions[activeQuestion]?.answers?.map((answer, index) => (
                <ListItem
                  key={`question-${activeQuestion}-answer-${index}`}
                  dense
                  button
                  onClick={handleToggle(index)}
                >
                  <ListItemIcon>
                    <Check
                      checked={answer.checked}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleToggle(index)}
                    />
                  </ListItemIcon>
                  <Answer key={index}>{answer.content}</Answer>
                </ListItem>
              ))}
            </AnswersList>
          </div>
        </Slide>
        <NextBtn open={open} onClick={handleClick} />
        <Message
          correct={correctAnswer}
          open={open}
          handleClose={handleClose}
        />
      </AnswersContent>
    </>
  );
};

export default Question;
