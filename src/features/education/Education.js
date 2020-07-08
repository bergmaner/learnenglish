import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveWord,
  selectWords,
  next,
  prev,
  fetchEducationAsync,
  goTo,
} from "./educationSlice";
import { selectCurrentUser } from "../auth/authSlice";
import Slide from "../../animations/Slide";
import Fade from "../../animations/Fade";
import { restart } from "../excercise/excerciseSlice";
import ProgressBar from "../../components/ProgressBar.js";
import CircularPagination from "../../components/CircularPagination";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { breakpoint } from "../../helpers/mediaQueries";

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #a5a5a5;
  font-size: 14px;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: #727272;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ImageWithPagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 420px;
  @media ${breakpoint.lg} {
    height: 380px;
    width: 100%;
  }
  @media ${breakpoint.md} {
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  @media ${breakpoint.sm} {
    height: 340px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  box-sizng: border-box;
  padding-bottom: 5px;
  @media ${breakpoint.lg} {
    flex-direction: column;
    min-height: 440px;
    width: 100%;
    justify-content: space-around;
  }
`;

const Examples = styled.div`
  font-size: 18px;
  text-align: left;
  padding: 0 15px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 400px;
  box-sizing: border-box;
  @media ${breakpoint.lg} {
    padding-top: 0;
    height: 90px;
    width: calc(100%-15px);
  }
  @media ${breakpoint.md} {
    font-size: 16px;
    padding-top: 0;
    height: 100px;
  }
  @media ${breakpoint.sm} {
    font-size: 14px;
    height: 120px;
  }
`;

const WordImage = styled.img`
  width: 350px;
  @media ${breakpoint.lg} {
    width: 300px;
  }
  @media ${breakpoint.md} {
    width: 250px;
  }
  @media ${breakpoint.sm} {
    width: 230px;
  }
`;

const WordText = styled.div`
  color: #a5a5a5;
  font-weight: 700;
  font-size: 21px;
  margin: 5px;
  @media ${breakpoint.md} {
    font-size: 16px;
  }
`;

const WordContent = styled.div`
width: 400px;
height: 410px;
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
@media ${breakpoint.lg}
{
  padding: top: 50px;
  height: 350px;
  width: 100%;
  box-sizing: border-box;
}
@media ${breakpoint.sm}
{
  height: 268px;
}`;

const ExcerciseBtn = styled(Button)`
  && {
    color: #fff;
    display: inline-block;
    background: #ca6082;
    padding: 2px;
    height: auto;
    padding: 5px 8px;
    font-size: 14px;
    border-radius: 16px;
    &:hover {
      background-color: #db7093;
    }
  }
`;

const Counter = styled.div`
  margin-bottom: 10px;
`;

const Progress = styled.div`
  width: 100%;
  font-size: 20px;
`;

const ArrowNavigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const Prev = styled.div`
  background-color: #ddd;
  cursor: pointer;
  color: #888;
  width: 20px;
  border-radius: 100%;
  padding: 5px 16px 9px 16px;
  font-size: 24px;
  margin: 0 20px;
  &:hover {
    background-color: #ccc;
    color: #222;
  }
`;

const Item = styled.div`
  flex: 1 0 21%;
  display: flex;
  justify-content: center;
  margin: 5px;
`;

const Next = styled.div`
  background-color: #ddd;
  cursor: pointer;
  color: #888;
  width: 20px;
  border-radius: 100%;
  padding: 5px 16px 9px 16px;
  font-size: 24px;
  margin: 0 20px;
  &:hover {
    background-color: #ccc;
    color: #222;
  }
`;

const Education = () => {
  const words = useSelector(selectWords);
  const user = useSelector(selectCurrentUser);
  const activeWord = useSelector(selectActiveWord);
  const history = useHistory();
  const dispatch = useDispatch();
  const { modul } = useParams();
  const [on, setOn] = useState(true);
  const [leftSlide, setLeftSlide] = useState(true);

  useEffect(() => {
    dispatch(fetchEducationAsync(modul, user));
  }, [modul,user]);

  const excercise = () => {
    dispatch(restart());
    history.push(`/excercise/${modul}`);
  };

  const updateActualWord = (pageNumber) => {
    if (
      pageNumber >= 0 &&
      pageNumber <= words.length &&
      pageNumber !== activeWord
    ) {
      pageNumber > activeWord ? setLeftSlide(true) : setLeftSlide(false);
      setOn(!on);
      dispatch(goTo(pageNumber));
    }
  };

  return (
    <Container>
      {((words.length > 0 && user && user.level !== -1) ||
        (words.length > 0 && !user)) && (
        <>
          <Fade width={90}>
            <Progress>
              <Counter>{`${activeWord + 1} / ${words.length}`}</Counter>
              <ProgressBar
                style={{ width: `${((activeWord + 1) / words.length) * 100}%` }}
              ></ProgressBar>
            </Progress>
          </Fade>
          <Slide key={on} leftSlide={leftSlide}>
            <Content>
              <ImageWithPagination>
                <CircularPagination words={words} activeWord={activeWord} handleClick={updateActualWord}/>
                <Fade key={on}>
                  <WordContent>
                    <WordImage src={words[activeWord].image} />
                    <WordText>
                      {words[activeWord].content} -{" "}
                      {words[activeWord].translation}
                    </WordText>
                  </WordContent>
                </Fade>
              </ImageWithPagination>
              <Examples>
                <div>
                  <span style={{ color: "palevioletred", fontWeight: 700 }}>
                    Examples
                  </span>
                  <br />
                  <span style={{ fontWeight: 700 }}>
                    {words[activeWord].exampleTranslation}
                  </span>{" "}
                  - {words[activeWord].example}
                </div>
              </Examples>
            </Content>
          </Slide>
          <Fade width={100}>
            <ArrowNavigation>
              <Item>
                <Prev
                  onClick={() => (
                    dispatch(prev()), setOn(!on), setLeftSlide(false)
                  )}
                >
                  &#8249;
                </Prev>
              </Item>
              {user && (
                <>
                  <ExcerciseBtn onClick={() => excercise()}>
                    Excercise
                  </ExcerciseBtn>
                </>
              )}
              {user === null && (
                <>
                  <StyledLink to="/login">
                    Zaloguj się aby wykonać ćwiczenia
                  </StyledLink>
                </>
              )}
              <Item>
                <Next
                  onClick={() => (
                    dispatch(next()), setOn(!on), setLeftSlide(true)
                  )}
                >
                  &#8250;
                </Next>
              </Item>
            </ArrowNavigation>
          </Fade>
        </>
      )}
      {words.length > 0 && user && user.level === -1 && (
        <>
          <div
            style={{
              minHeight: "calc(100vh - 60px)",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ margin: "10px" }}>
              {" "}
              Sprawdź swój poziom poprzez test{" "}
            </div>
            <div style={{ margin: "10px" }}>
              <ExcerciseBtn onClick={() => excercise()}>
                Check your level
              </ExcerciseBtn>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Education;
