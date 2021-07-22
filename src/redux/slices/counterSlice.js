import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload.change;
    },

    decrement: (state, action) => {
      state.count -= action.payload.change;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const selectCount = (state) => state.counterStore.count;

export default counterSlice.reducer;
