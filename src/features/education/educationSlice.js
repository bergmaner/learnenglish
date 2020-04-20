import { createSlice} from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
export const educationSlice = createSlice({
  name: 'education',
  initialState: {
    activeModul: 0,
    activeWord: 0,
    moduls:[
      {
      words: []
      }
    ]
    }
    ,
    reducers: {
      next: state => {
      state.activeWord = state.activeWord === state.moduls[state.activeModul].words.length -1
       ? 0
       : state.activeWord += 1 ;
        
      },
      prev: state => {
       state.activeWord = state.activeWord === 0 
       ? state.moduls[state.activeModul].words.length-1  
       : state.activeWord -= 1;
      },
      changeActiveModul: (state,action) => {
        
        state.activeModul = action.payload;
        state.activeWord = 0;
      },
      updateEducation : (state,action) => {
        state.moduls[state.activeModul].words = action.payload;
      }
  }
})
export const {next,prev,changeActiveModul,updateEducation} = educationSlice.actions;

export const selectWords =  state => state.education.moduls[state.education.activeModul].words;
export const selectActiveWord = state => state.education.activeWord;
export const selectActiveModul = state =>  state.education.activeModul;
export const fetchEducationAsync = modul => async dispatch => {
  const result = await db.collection('education').doc(modul).get();
  dispatch(updateEducation(result.data().education));
};

export default educationSlice.reducer;