import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { selectCurrentUser } from '../auth/authSlice';

export const educationSlice = createSlice({
  name: 'education',
  initialState: {
    activeWord: 0,
      words: []
    }
    ,
    reducers: {
      goTo : (state,action) => 
      {
        console.log(`payload : ${action.payload}`);
        state.activeWord = action.payload;
      },
      next: state =>
      {
      state.activeWord = state.activeWord === state.words.length -1
       ? 0
       : state.activeWord += 1 ;
      },
      prev: state => 
      {
       state.activeWord = state.activeWord === 0 
       ? state.words.length-1  
       : state.activeWord -= 1;
      },
      updateEducation : (state,action) => 
      {
        state.activeWord = 0;
         
        console.log(`userLev : ${action.payload.user?.level}`);
        if(!action.payload.user || action.payload?.user.level === -1)
        {
          const education = action.payload.education.filter(edc => { if(edc.difficulty === 0) return true });
          state.words = education;
        }
   
      }
  }
})
export const { next, prev, updateEducation,reset, goTo } = educationSlice.actions;
export const selectWords =  state => state.rootReducer.education.words;
export const selectActiveWord = state => state.rootReducer.education.activeWord;
export const fetchEducationAsync = (modul,user) => async dispatch => {
  const result = await db.collection('education').doc(modul).get();
  const obj = {};
  obj.education = result.data().education;
  obj.user = (user) ? user : null;
  dispatch(updateEducation(obj));
};

export default educationSlice.reducer;