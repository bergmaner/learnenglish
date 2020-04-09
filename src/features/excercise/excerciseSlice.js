import { createSlice } from '@reduxjs/toolkit';
export const excerciseSlice = createSlice({
  name: 'excercise',
  initialState: {
    activeModul: 0,
    activeQuestion: 0,
    activeInteractiveQuestion: 0,
    activeSlices : [],
    points:0,
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
        winCode : [0,3,2],
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
        const correctCode = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].winCode;
        if(state.activeSlices.join('') === correctCode.join(''))state.points +=1;
        
       
         
        state.activeSlices = [];
        
      

      },
      toggleToSentence : (state,action) => 
      {
      const slice = state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices[action.payload]; 
      slice.checked = !slice.checked;
      slice.checked ? state.activeSlices.push(action.payload) : state.activeSlices.splice(state.activeSlices.indexOf(action.payload),1);
       
      },
      changeActivModul: (state,action) => {
        
        console.log(`activeModul: ${state.activeModul}`)
        state.activeModul = action.payload;
        state.questionsVisible = true;
        state.activeQuestion = 0;
        state.activeInteractiveQuestion = 0;
        state.activeSlices = [];
        state.moduls[state.activeModul].interactiveQuestions[state.activeInteractiveQuestion].slices.map( slice => slice.checked = false);
        state.points = 0;
      }
    }
        

})
export const {nextQuestion, nextInteractiveQuestion, toggleToSentence,changeActivModul} = excerciseSlice.actions;
export const selectQuestions = state => state.excercise.moduls[state.excercise.activeModul].questions;
export const selectActiveQuestion = state => state.excercise.activeQuestion;
export const selectInteractiveQuestions = state => state.excercise.moduls[state.excercise.activeModul].interactiveQuestions;
export const selectActiveInteractiveQuestion = state => state.excercise.activeInteractiveQuestion
export const selectQuestionsVisible = state => state.excercise.questionsVisible;
export const selectActiveSlices = state => state.excercise.activeSlices;
export default excerciseSlice.reducer;
