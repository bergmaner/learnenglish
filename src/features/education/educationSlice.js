import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";

export const educationSlice = createSlice({
  name: "education",
  initialState: {
    activeWord: 0,
    words: [],
  },
  reducers: {
    goTo: (state, action) => {
      state.activeWord = action.payload;
    },
    next: (state) => {
      state.activeWord =
        state.activeWord === state.words.length - 1
          ? 0
          : (state.activeWord += 1);
    },
    prev: (state) => {
      state.activeWord =
        state.activeWord === 0
          ? state.words.length - 1
          : (state.activeWord -= 1);
    },
    updateEducation: (state, action) => {
      let level = -1;
      state.activeWord = 0;
      if (action.payload.user) {
        level = action.payload.user.level;
      } else {
        level = -1;
      }
      if (!action.payload.user || level === -1) {
        const education = action.payload.education.filter((edc) => {
          return edc.difficulty === 0 ? true : "";
        });
        state.words = education;
      } else if (action.payload.user && level !== -1) {
        const education = action.payload.education.filter((edc) => {
          return edc.difficulty === level ? true : "";
        });
        state.words = education;
      }
    },
  },
});
export const {
  next,
  prev,
  updateEducation,
  reset,
  goTo,
} = educationSlice.actions;
export const selectWords = (state) => state.rootReducer.education.words;
export const selectActiveWord = (state) => state.rootReducer.education.activeWord;
export const fetchEducationAsync = (modul, user) => async (dispatch) => {
  const result = await db.collection("education").doc(modul).get();
  const obj = { education: result.data().education, user: user };
  dispatch(updateEducation(obj));
};

export default educationSlice.reducer;
