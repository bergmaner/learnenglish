import { createSlice } from '@reduxjs/toolkit';
export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeModul: 0,
    activeQuestion: 0,
    moduls:[
      {
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
    ]},
    reducers:{
      next : state =>
      {
        state.activeQuestion += 1;
      }
    }
        

})
export const {next} = excerciseSlice.actions;
export const selectQuestions = state => state.excercise.moduls[state.excercise.activeModul].questions;
export const selectActiveQuestion = state => state.excercise.activeQuestion;
export default excerciseSlice.reducer;
