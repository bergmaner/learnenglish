import { createSlice } from '@reduxjs/toolkit';
export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeModul: 0,
    activeQuestion: 0,
    activeInteractiveQuestion: 0,
    questionsVisible: true,
    moduls:[
      {
     //0modul   
    interactiveQuestions: [
      {
      content : "Ala ma kota",
      slices : [
        {content: "Alice", checked:false},
        {content: "plane", checked:false},
        {content: "have", checked:false},
        {content: "cat", checked:false},
        {content: "plane", checked:false},
        {content: "have", checked:false},
        {content: "cat", checked:false},
        {content: "Alice", checked:false},
        {content: "plane", checked:false},
        {content: "have", checked:false},
        {content: "cat", checked:false},
        {content: "plane", checked:false},
        {content: "have", checked:false},
        {content: "cat", checked:false}
      ]
      }
    ],
      questions: [

        {
      content: "Jak jest auto po angielsku?",
      answers: [
        {id: 1, content: "car"},
        {id: 2, content: "plane"},
        {id: 3, content: "boat"},
        {id: 4, content: "coat"}
      ]
    },
    {
      content: "Jak jest auto po angielsku2?",
      answers: [
        {id: 1, content: "caca"},
        {id: 2, content: "plane"},
        {id: 3, content: "boat"},
        {id: 4, content: "coat"}
      ]
    }
      ] },
      {
        //1 modul
        interactiveQuestions: [
          {
          content : "Ala ma kota",
          slices : [
            {content: "Alice", checked:false},
            {content: "plane", checked:false},
            {content: "have", checked:false},
            {content: "cat", checked:false},
            {content: "plane", checked:false},
            {content: "have", checked:false},
            {content: "cat", checked:false}
          ]
          }
        ],
        questions: [
          {
            content: "Jak jest auto po angielsku?",
            answers: [
              {id: 1, content: "car"},
              {id: 2, content: "plane"},
              {id: 3, content: "boat"},
              {id: 4, content: "coat"}
            ]
          }
        ]
      }
    ]
   },
    reducers:{
      nextQuestion : state =>
      {
        state.activeQuestion += 1;
      },
      nextInteractiveQuestion : state =>
      {
        
        state.questionsVisible ? state.questionsVisible = false : state.activeInteractiveQuestion += 1;
        
      },
      pushToSentence : (state,action) => 
      {
       state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload].checked = true;
       console.log(state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload].checked);
      }
    }
        

})
export const {nextQuestion, nextInteractiveQuestion, pushToSentence} = excerciseSlice.actions;
export const selectQuestions = state => state.excercise.moduls[state.excercise.activeModul].questions;
export const selectActiveQuestion = state => state.excercise.activeQuestion;
export const selectInteractiveQuestions = state => state.excercise.moduls[state.excercise.activeModul].interactiveQuestions;
export const selectActiveInteractiveQuestion = state => state.excercise.activeInteractiveQuestion
export const selectQuestionsVisible = state => state.excercise.questionsVisible;
export default excerciseSlice.reducer;
