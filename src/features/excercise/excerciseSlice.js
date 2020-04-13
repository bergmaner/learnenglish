import { createSlice } from '@reduxjs/toolkit';
export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeModul: 0,
    activeQuestion: 0,
    activeInteractiveQuestion: null,
    checkIndex : null,
    activeSlices : [],
    points:0,
    finished: false,
    questionsVisible: true,
    moduls:[
      {
     //0modul   
    interactiveQuestions: [
      {
      content : "Ala ma kota",
      winCode : [0,3,2],
      slices : [
        {content: "Alice", checked:false},
        {content: "plane", checked:false},
        {content: "cat", checked:false},
        {content: "have", checked:false}
      ]
      },
      {
        content : "Ala ma kota",
        winCode : [0,2,3],
        slices : [
          {content: "Alice", checked:false},
          {content: "plane", checked:false},
          {content: "have", checked:false},
          {content: "cat", checked:false}
        ]
        }
    ],
      questions: [

        {
      content: "Jak jest auto po angielsku?",
      correctAnswer : 0,
      answers: [
        {id: 0, content: "car", checked: false},
        {id: 1, content: "plane", checked: false},
        {id: 2, content: "boat", checked: false},
        {id: 3, content: "coat", checked: false}
      ]
    },
    {
      content: "Jak jest auto po angielsku2?",
      correctAnswer: 2, 
      answers: [
        {id: 0, content: "caca", checked: false},
        {id: 1, content: "plane", checked: false},
        {id: 2, content: "car", checked: false},
        {id: 3, content: "coat", checked: false}
      ]
    }
      ] },
      {
        //1 modul
        interactiveQuestions: [
          {
          content : "Ala ma kota",
          winCode : [0,2,3],
          slices : [
            {content: "Alice", checked:false},
            {content: "plane", checked:false},
            {content: "have", checked:false},
            {content: "cat", checked:false}
          ]
          },
          {
            content : "Ala ma kota",
            winCode : [0,2,3],
            slices : [
              {content: "Alice", checked:false},
              {content: "plane", checked:false},
              {content: "have", checked:false},
              {content: "cat", checked:false}
            ]
            }
        ],
        questions: [
          {
            content: "Jak jest auto po angielsku?",
            correctAnswer: 0,
            answers: [
              {id: 0, content: "car", checked: false},
              {id: 1, content: "plane", checked: false},
              {id: 2, content: "boat", checked: false},
              {id: 3, content: "coat", checked: false}
            ]
          }
        ]
      }
    ]
   },
    reducers:{
      nextQuestion : state =>
      {
        const question = state.moduls[state.activeModul].questions[state.activeQuestion];
        question.answers.map( answer => answer.checked = false);
        state.activeQuestion += state.activeQuestion === state.moduls[state.activeModul].questions.length-1 ? 0 : 1;
        state.points += state.checkIndex === question.correctAnswer ? 1 : 0;
        state.checkIndex = null;
      },
      nextInteractiveQuestion : state =>
      {
        if(state.activeInteractiveQuestion !== null)
        {
          const correctCode = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].winCode;
        state.points += state.activeSlices.join('') === correctCode.join('') ? 1 : 0;
        }
        
        state.questionsVisible = false;
        state.activeInteractiveQuestion += state.activeInteractiveQuestion === state.moduls[state.activeModul].interactiveQuestions.length-1 || state.activeInteractiveQuestion === null ? 0 : 1;
        console.log(`${null + 0} int :${state.activeInteractiveQuestion} length:  ${state.moduls[state.activeModul].interactiveQuestions.length}`);
        const slices = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices;
        slices.map( slice => slice.checked = false);
       
        state.activeSlices = [];
      },
      toggleCheckbox : (state,action) =>
      {
        const answers = state.moduls[state.activeModul].questions[state.activeQuestion].answers;
        answers.map( answer => answer.checked = false);
        state.checkIndex = action.payload;
        answers[action.payload].checked = true;

      },
      toggleToSentence : (state,action) => 
      {
      const slice = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload]; 
      slice.checked = !slice.checked;
      slice.checked ? state.activeSlices.push(action.payload) : state.activeSlices.splice(state.activeSlices.indexOf(action.payload),1);
      
      },
      finishQuiz : (state) => 
      {
        const correctCode = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].winCode;
        state.points += state.activeSlices.join('') === correctCode.join('') ? 1 : 0;
        state.finished = true;
      },
      changeActivModul: (state,action) => {
        
        console.log(`activeModul: ${state.activeModul}`)
        state.activeModul = action.payload;
        state.questionsVisible = true;
        state.activeQuestion = 0;
        state.activeInteractiveQuestion = null;
        state.points = 0;
        state.finished = false;
       
      }
    }
})
export const {nextQuestion, nextInteractiveQuestion, toggleToSentence,changeActivModul,toggleCheckbox,finishQuiz} = excerciseSlice.actions;
export const selectQuestions = state => state.excercise.moduls[state.excercise.activeModul].questions;
export const selectActiveQuestion = state => state.excercise.activeQuestion;
export const selectInteractiveQuestions = state => state.excercise.moduls[state.excercise.activeModul].interactiveQuestions;
export const selectActiveInteractiveQuestion = state => state.excercise.activeInteractiveQuestion
export const selectQuestionsVisible = state => state.excercise.questionsVisible;
export const selectActiveSlices = state => state.excercise.activeSlices;
export const selectFinished = state => state.excercise.finished;
export const selectPoints = state => state.excercise.points;
export default excerciseSlice.reducer;
