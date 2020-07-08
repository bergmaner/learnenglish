import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser, setLevel } from "../auth/authSlice";
import {
  selectQuestionsVisible,
  selectQuestions,
  selectActiveQuestion,
  selectInteractiveQuestions,
  selectActiveInteractiveQuestion,
  selectFinished,
  selectScore,
  finishQuiz,
  fetchExcerciseAsync,
  setQuestionsVisible,
} from "./excerciseSlice";
import Question from "./Question";
import InteractiveQuestion from "./InteractiveQuestion";
import Summary from "../../pages/Summary";

const Excercise = () => {
  const questions = useSelector(selectQuestions);
  const activeQuestion = useSelector(selectActiveQuestion);
  const interactiveQuestions = useSelector(selectInteractiveQuestions);
  const activeInteractiveQuestion = useSelector(
    selectActiveInteractiveQuestion
  );
  const questionsVisible = useSelector(selectQuestionsVisible);
  const finished = useSelector(selectFinished);
  const user = useSelector(selectCurrentUser);
  const score = useSelector(selectScore);
  const progress = `${
    ((activeQuestion + activeInteractiveQuestion + 1) /
      (questions.length + interactiveQuestions.length)) *
    100
  }%`;
  const dispatch = useDispatch();
  const { modul } = useParams();

  React.useEffect(() => {
    if (user && questionsVisible !== undefined) {
      dispatch(fetchExcerciseAsync(modul, user));
    }
  }, [user]);

  React.useEffect(() => {
    if (activeQuestion > questions.length - 1 && questions.length > 0) {
      dispatch(setQuestionsVisible(false));
    }
  }, [activeQuestion]);

  React.useEffect(() => {
    if (activeInteractiveQuestion > 4) {
      dispatch(finishQuiz());
      dispatch(setLevel(score));
    }
  }, [activeInteractiveQuestion]);

  return (
    <>
      <Question visible={questionsVisible} progress={progress} />
      <InteractiveQuestion
        questionsVisible={questionsVisible}
        finished={finished}
        progress={progress}
      />
      <Summary finished={finished} />
    </>
  );
};
export default Excercise;
