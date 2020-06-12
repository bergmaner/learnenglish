import { combineReducers } from "@reduxjs/toolkit";
import excerciseReducer from "../features/excercise/excerciseSlice";
import educationReducer from "../features/education/educationSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  education: educationReducer,
  excercise: excerciseReducer,
  auth: authReducer,
});
export default rootReducer;
