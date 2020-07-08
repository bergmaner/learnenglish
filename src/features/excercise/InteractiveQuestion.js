import React, { useState } from "react";
import styled from "styled-components";
import {
  selectInteractiveQuestions,
  selectActiveSlices,
  selectActiveInteractiveQuestion,
  selectCorrectAnswer,
  toggleToSentence,
  nextInteractiveQuestion,
} from "./excerciseSlice";
import { useSelector, useDispatch } from "react-redux";
import Slide from "../../animations/Slide";
import Fade from "../../animations/Fade";
import ProgressBar from "../../components/ProgressBar";
import NextBtn from "../../components/NextBtn";
import Message from "../../components/Message";
import { breakpoint } from "../../helpers/mediaQueries";

const WordSlice = styled.span`
  border-radius: 16px;
  background: #c7c7c7;
  color: transparent;
  padding: 5px;
  font-size: 18px;
  margin: 10px;
  border: solid 2px #c7c7c7;
  user-select: none;
`;

const Word = styled.span`
  background: none;
  color: #c7c7c7;
  font-size: 18px;
  border-radius: 16px;
  padding: 5px;
  margin: 10px;
  border: solid 2px #c7c7c7;
  cursor: pointer;
  &.active {
    background: #ddd;
    border: solid 2px #b6b6b6;
    color: #b6b6b6;
  }
`;

const WordsContent = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media ${breakpoint.md} {
    width: 80%;
  }
  @media ${breakpoint.sm} {
    width: 100%;
  }
`;

const InteractiveContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 520px;
`;

const SliceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 120px;
`;
const Title = styled.div`
  padding-top: 50px;
  margin: 20px 0;
  width: 100%;
`;

const InteractiveQuestion = ({questionsVisible, progress}) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [open, setOpen] = React.useState(true);
  const [on, setOn] = useState(true);
  const interactiveQuestions = useSelector(selectInteractiveQuestions);
  const activeInteractiveQuestion = useSelector(
    selectActiveInteractiveQuestion
  );
  const activeSlices = useSelector(selectActiveSlices);
  const correctAnswer = useSelector(selectCorrectAnswer);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!open) {
      dispatch(nextInteractiveQuestion());
      setOn(!on);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleSentence = (index) => {
    dispatch(toggleToSentence(Number(index)));
    setHoverIndex(-1);
  };

  if (
    questionsVisible ||
    questionsVisible === null ||
    activeInteractiveQuestion > 4
  ) {
    return null;
  }

  return (
    <>
      <Fade width={90}>
        <ProgressBar style={{ width: progress }} />
      </Fade>
      <InteractiveContent>
        <Slide key={on} width={100}>
          <Title>
            {interactiveQuestions[activeInteractiveQuestion].content}
          </Title>
          <SliceContainer>
            {activeSlices.map((id) =>
              interactiveQuestions[activeInteractiveQuestion].slices[id]
                .checked ? (
                <Word
                  className={hoverIndex === id ? "active" : ""}
                  onClick={() => toggleSentence(id)}
                  onMouseEnter={() => setHoverIndex(id)}
                  onMouseLeave={() => setHoverIndex(-1)}
                  key={id}
                >
                  {
                    interactiveQuestions[activeInteractiveQuestion].slices[id]
                      .content
                  }
                </Word>
              ) : (
                ""
              )
            )}
          </SliceContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WordsContent>
              {interactiveQuestions[activeInteractiveQuestion].slices.map(
                (slice, index) =>
                  !slice.checked ? (
                    <Word
                      className={hoverIndex === index ? "active" : ""}
                      onClick={() => toggleSentence(index)}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(-1)}
                      key={index}
                    >
                      {slice.content}
                    </Word>
                  ) : (
                    <WordSlice key={index}>{slice.content}</WordSlice>
                  )
              )}
            </WordsContent>
          </div>
        </Slide>
        <NextBtn onClick={handleClick} />
        <Message
          correct={correctAnswer}
          open={open}
          handleClose={handleClose}
        />
      </InteractiveContent>
    </>
  );
};

export default InteractiveQuestion;
