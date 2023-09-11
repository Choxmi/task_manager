import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '../Reducers/Layout'
import taskReducer from '../Reducers/Tasks'

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        tasks: taskReducer
    },
})