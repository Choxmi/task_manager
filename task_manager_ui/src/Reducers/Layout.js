import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    collapsed: false,
    page: ''
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed
        },
        setPage: (state, action) => {
            state.page += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleSidebar, setPage } = layoutSlice.actions

export default layoutSlice.reducer