import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/indexReducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;