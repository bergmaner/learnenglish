import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import educationReducer from '../features/education/educationSlice';

export default configureStore({
  reducer: {
    education: educationReducer
  },
});
