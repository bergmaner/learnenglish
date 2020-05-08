import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';


export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeQuestion: 0,
    activeInteractiveQuestion: null,
    checkIndex : null,
    activeSlices : [],
    points:0,
    finished: false,
    questionsVisible: null,
    questions:[],
    interactiveQuestions:[]
   },
    reducers:{
      nextQuestion : state =>
      {
        
        const question = state.questions[state.activeQuestion];
        question.answers.map( answer => answer.checked = false);
        state.points += state.checkIndex === question.correctAnswer ? 1 : 0;
        state.activeQuestion += state.activeQuestion === state.questions.length-1 ? 0 : 1;

        state.checkIndex = null;
      },
      nextInteractiveQuestion : state =>
      {
        if(state.activeInteractiveQuestion !== null)
        {
          const correctCode = state.interactiveQuestions[state.activeInteractiveQuestion].winCode;
          state.points += state.activeSlices.join('') === correctCode ? 1 : 0;
        }
        
        state.questionsVisible = false;
        state.activeInteractiveQuestion += state.activeInteractiveQuestion === state.interactiveQuestions.length-1 || state.activeInteractiveQuestion === null ? 0 : 1;
        const slices = state.interactiveQuestions[state.activeInteractiveQuestion].slices;
        slices.map( slice => slice.checked = false);
        state.activeSlices = [];
      },
      toggleCheckbox : (state,action) =>
      {
        const answers = state.questions[state.activeQuestion].answers;
        answers.map( answer => answer.checked = false);
        state.checkIndex = action.payload;
        answers[action.payload].checked = true;

      },
      toggleToSentence : (state,action) => 
      {
      const slice = state.interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload]; 
      slice.checked = !slice.checked;
      slice.checked ? state.activeSlices.push(action.payload) : state.activeSlices.splice(state.activeSlices.indexOf(action.payload),1);
      
      },
      finishQuiz : (state) => 
      {
        const correctCode = state.interactiveQuestions[state.activeInteractiveQuestion].winCode;
        state.points += state.activeSlices.join('') === correctCode ? 1 : 0;
        state.finished = true;
      },
      restart: (state) => {
        
        state.questionsVisible = null;
        state.activeQuestion = 0;
        state.activeInteractiveQuestion = null;
        state.points = 0;
        state.finished = false;
       
      },
      updateExcercise : (state,action) =>
      {
        state.questions = action.payload.questions;
        state.interactiveQuestions = action.payload.interactiveQuestions;
        state.questions.map( question => question.answers.map(answer => answer.checked = false));
        state.questionsVisible = true;
      }
    }
})
export const {nextQuestion, nextInteractiveQuestion, toggleToSentence,restart,toggleCheckbox,finishQuiz,updateExcercise} = excerciseSlice.actions;
export const selectQuestions = state => state.rootReducer.excercise.questions;
export const selectCheckIndex = state => state.rootReducer.excercise.checkIndex;
export const selectActiveQuestion = state => state.rootReducer.excercise.activeQuestion;
export const selectInteractiveQuestions = state => state.rootReducer.excercise.interactiveQuestions;
export const selectActiveInteractiveQuestion = state => state.rootReducer.excercise.activeInteractiveQuestion
export const selectQuestionsVisible = state => state.rootReducer.excercise.questionsVisible;
export const selectActiveSlices = state => state.rootReducer.excercise.activeSlices;
export const selectFinished = state => state.rootReducer.excercise.finished;
export const selectPoints = state => state.rootReducer.excercise.points;
export const fetchExcerciseAsync = modul => async dispatch => {
  console.log(modul);
  const result = await db.collection('excercise').doc(modul).get();
  dispatch(updateExcercise(result.data()));
};
export default excerciseSlice.reducer;
