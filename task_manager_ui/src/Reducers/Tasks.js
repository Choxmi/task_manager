import { createSlice } from '@reduxjs/toolkit'
import { getTasks } from '../Api'

const initialState = {
    tasks: [],
    filteredTasks: [],
    selectedTask: null
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setFilteredTasks: (state, action) => {
            state.filteredTasks = action.payload
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
    },
})

export const { setTasks, setSelectedTask, setFilteredTasks } = taskSlice.actions

export default taskSlice.reducer