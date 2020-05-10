import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    comunicat: '',
    difficulties: ['beginner','pre-intermediate','intermediate','upper-intermediate','advanced']
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLevel:(state,action) => {
      if(state.user.level === -1)
      { 
       if (action.payload >= 0 && action.payload <= 20)  state.user.level = 0;
       else if(action.payload > 20 && action.payload <= 40)  state.user.level = 1;
       else if(action.payload > 40 && action.payload <= 60)  state.user.level = 2;
       else if(action.payload > 60 && action.payload <= 80)  state.user.level = 3;
       else if(action.payload > 80 && action.payload <= 100) state.user.level = 4;
        console.log(state.user.level);
      }
      else if( state.user.level >= 0 && state.user.level <= 4)  {
        if( action.payload <= 25 && ( state.user.level !==0  && state.user.level !== 4 ) ) 
        {
          state.user.level--;
          state.comunicat = `Wrrr,You are downgrade. Your current level: ${state.difficulties[state.user.level]}`;
        }
        else if( action.payload >= 75 && ( state.user.level !==0  && state.user.level !== 4 ) ) 
        {
          state.user.level++;
          state.comunicat = `Congrats,You are level up. Your current level: ${state.difficulties[state.user.level]}`;
        }
        else if(  action.payload <= 25 &&  state.user.level === 0 )
      {
        state.comunicat = `Wrrr,Isn't possibly downgrade more :(. Your current level: ${state.difficulties[state.user.level]}`;
      }
      else if(  action.payload >= 75 &&  state.user.level === 4 )
      {
        state.comunicat = `Nice,Is the highest possible level. Your current level: ${state.difficulties[state.user.level]}`;
      }
      }
     const stats = {
        score: action.payload,
        date: Date.now()};
       
      
      state.user.stats.push(stats) ;
     
        
    
      db.collection("users").doc(state.user.uid).update({
        level : state.user.level,
        stats: state.user.stats });
    }
  },
});

export const { login, logout, setLevel } = slice.actions;

export const selectCurrentUser = state => state.rootReducer.auth.user;
export const selectComunicat = state => state.rootReducer.auth.comunicat;

export default slice.reducer;