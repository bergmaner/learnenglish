import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';


export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeQuestion: 0,
    activeInteractiveQuestion: null,
    checkIndex : null,
    activeSlices : [],
    points: 0,
    score: 0,
    finished: false,
    questionsVisible: null,
    questions:[],
    questionsNums: [],
    interactiveQuestions:[],
    interactiveQuestionsNums: [],
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
      toggleToSentence: (state,action) => 
      {
      const slice = state.interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload]; 
      slice.checked = !slice.checked;
      slice.checked ? state.activeSlices.push(action.payload) : state.activeSlices.splice(state.activeSlices.indexOf(action.payload),1);
      
      },
      finishQuiz : (state) => 
      {
        const correctCode = state.interactiveQuestions[state.activeInteractiveQuestion].winCode;
        state.points += state.activeSlices.join('') === correctCode ? 1 : 0;
        state.score = Math.floor(((state.points) / (state.questions.length + state.interactiveQuestions.length) * 100));
        state.finished = true;
      },
      restart: (state) => {
        
        state.questionsVisible = null;
        state.activeQuestion = 0;
        state.activeInteractiveQuestion = null;
        state.points = 0;
        state.score = 0;
        state.finished = false;
       
      },
      updateExcercise : (state,action) =>
      {
        const level = action.payload.user.level;
        let questionNums = [],
        interactiveQuestionNums = [];
    
        if(!action.payload.user || level === -1)
        {
          state.questions = action.payload.questions.filter(question => { return (question.difficulty === 0) ? true : ''});
          state.interactiveQuestions = action.payload.interactiveQuestions.filter(interactiveQuestion => { return (interactiveQuestion.difficulty === 0) ? true : ''});
         
       }
       else if(action.payload.user && level !== -1)
        {
          state.questions = action.payload.questions.filter(question => { return (question.difficulty === level) ? true : '' });
          state.interactiveQuestions = action.payload.interactiveQuestions.filter(interactiveQuestion => { return (interactiveQuestion.difficulty === level) ? true : '' });
       }

       if( state.questionsNums.includes(undefined) || state.questionsNums.length === 0 )
       {
         state.questionsNums = [];
         state.interactiveQuestionsNums = [];
        
         for( let i = 0; i<state.questions.length; i++)
         {
           questionNums.push(i);
         }

         for( let i = 0; i<state.interactiveQuestions.length; i++)
         {
           interactiveQuestionNums.push(i);
         }
       }
      
       let questionsLength = questionNums.length -1,
        interactiveQuestionsLength = interactiveQuestionNums.length -1,
       j = 0;
     
   while (questionsLength > state.questions.length-5-1) {
       j = Math.floor(Math.random() * (questionsLength+1));
       state.questionsNums.push(questionNums[j]);
       questionNums.splice(j,1);
       questionsLength--;
   }
   while (interactiveQuestionsLength > state.interactiveQuestions.length-5-1) {
     j = Math.floor(Math.random() * (interactiveQuestionsLength+1));
     state.interactiveQuestionsNums.push(interactiveQuestionNums[j]);
     interactiveQuestionNums.splice(j,1);
     interactiveQuestionsLength--;
 }
   

        const questions = state.questions.filter( (question,index) => { return(state.questionsNums.includes(index)) ? question : '' });
        if(questions.length > 0) state.questions = questions;
        const interactiveQuestions = state.interactiveQuestions.filter( (interactiveQuestion,index) => { return(state.interactiveQuestionsNums.includes(index)) ? interactiveQuestion : '' });
        if(interactiveQuestions.length > 0) state.interactiveQuestions = interactiveQuestions;
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
export const selectScore = state => state.rootReducer.excercise.score;
export const fetchExcerciseAsync = (modul,user) => async dispatch => {
  const result = await db.collection('excercise').doc(modul).get();
  const obj = { ...result.data(),
    user: user
  };
  await dispatch( updateExcercise(obj) );
};
export default excerciseSlice.reducer;
