import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'education',
  initialState: {
    activeModul: 0,
    moduls:[
      {
      words: [
      {content: "plane", translation: "samolot"},
      {content: "car", translation: "auto"}
      ]},
      {
        words: [
      {content: "face", translation: "twarz"},
      {content: "nose", translation: "nos"}
        ]
      }
    ]}
})

export const selectWords = state => state.education.moduls[0].words;
   export default slice.reducer;