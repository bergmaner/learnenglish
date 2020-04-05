import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'education',
  initialState: {
    activeModul: 0,
    activeWord: 0,
    moduls:[
      {
      words: [
      {content: "plane", translation: "samolot",img : "data:image/jpeg;base64,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"},
      {content: "car", translation: "auto",img : "data:image/jpeg;base64,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"}
      ]},
      {
        words: [
      {content: "face", translation: "twarz"},
      {content: "nose", translation: "nos"}
        ]
      }
    ]}
})

export const selectWords = state => state => state.education.moduls[state.education.activeModul].words;

export const selectActiveWords = state => state.education.moduls[state.education.activeModul].words[state.education.activeWord];

   export default slice.reducer;