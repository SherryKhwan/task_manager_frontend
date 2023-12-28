import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    modifyTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, modifyTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
