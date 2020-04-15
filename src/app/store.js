import { configureStore } from '@reduxjs/toolkit';
import excerciseReducer from '../features/excercise/excerciseSlice';
import educationReducer from '../features/education/educationSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    education: educationReducer,
    excercise: excerciseReducer,
    auth: authReducer
  },
});
