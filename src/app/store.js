import { configureStore } from '@reduxjs/toolkit';
import excerciseReducer from '../features/excercise/excerciseSlice';
import educationReducer from '../features/education/educationSlice';

export default configureStore({
  reducer: {
    education: educationReducer,
    excercise: excerciseReducer
  },
});
