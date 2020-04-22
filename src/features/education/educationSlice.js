import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
export const educationSlice = createSlice({
  name: 'education',
  initialState: {
    activeWord: 0,
      words: []
    }
    ,
    reducers: {
      next: state => {
      state.activeWord = state.activeWord === state.words.length -1
       ? 0
       : state.activeWord += 1 ;
        
      },
      prev: state => {
       state.activeWord = state.activeWord === 0 
       ? state.words.length-1  
       : state.activeWord -= 1;
      },
      updateEducation : (state,action) => {
        state.words = action.payload;
      }
  }
})
export const {next,prev,updateEducation} = educationSlice.actions;
export const selectWords =  state => state.education.words;
export const selectActiveWord = state => state.education.activeWord;
export const fetchEducationAsync = modul => async dispatch => {
  const result = await db.collection('education').doc(modul).get();
  dispatch(updateEducation(result.data().education));
};

export default educationSlice.reducer;