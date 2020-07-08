import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
export const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    username: "",
    comunicat: "",
    min: 30,
    max: 70,
    difficulties: [
      "beginner",
      "pre-intermediate",
      "intermediate",
      "upper-intermediate",
      "advanced",
    ],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLevel: (state, action) => {
      if (state.user.level === -1) {
        if (action.payload >= 0 && action.payload <= 20) state.user.level = 0;
        else if (action.payload > 20 && action.payload <= 40)
          state.user.level = 1;
        else if (action.payload > 40 && action.payload <= 60)
          state.user.level = 2;
        else if (action.payload > 60 && action.payload <= 80)
          state.user.level = 3;
        else if (action.payload > 80 && action.payload <= 100)
          state.user.level = 4;
        state.comunicat = `Your current Level : ${
          state.difficulties[state.user.level]
        }`;
      } else if (state.user.level >= 0 && state.user.level <= 4) {
        if (
          action.payload <= state.min &&
          state.user.level !== 0 &&
          state.user.level !== 4
        ) {
          state.user.level--;
          state.comunicat = `Wrrr,You are downgrade. Your current level: ${
            state.difficulties[state.user.level]
          }`;
        } else if (
          action.payload >= state.max &&
          state.user.level !== 0 &&
          state.user.level !== 4
        ) {
          state.user.level++;
          state.comunicat = `Congrats,You are level up. Your current level: ${
            state.difficulties[state.user.level]
          }`;
        } else if (action.payload <= state.min && state.user.level === 0) {
          state.comunicat = `Wrrr,Isn't possibly downgrade more :(`;
        } else if (action.payload >= state.max && state.user.level === 4) {
          state.comunicat = `Nice,Is the highest possible level.`;
        } else if (action.payload < state.max && action.payload > state.min) {
          state.comunicat = `Isn't bad.`;
        }
      }
      const now = new Date(Date.now()).toLocaleString();
      const stats = {
        score: action.payload,
        date: now.slice(0, now.indexOf(",")),
      };

      state.user.stats.push(stats);

      db.collection("users").doc(state.user.uid).update({
        level: state.user.level,
        stats: state.user.stats,
      });
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { login, logout, setLevel, setUsername } = slice.actions;

export const selectCurrentUser = (state) => state.rootReducer.auth.user;
export const selectComunicat = (state) => state.rootReducer.auth.comunicat;
export const selectUsername = (state) => state.rootReducer.auth.username;
export const selectDifficulties = (state) => state.rootReducer.auth.difficulties;
export default slice.reducer;
