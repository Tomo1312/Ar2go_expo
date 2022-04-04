import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sculptures: null,
  architectures: null,
  monuments: null,
};

export const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    setSculptures: (state, action) => {
      state.sculptures = action.payload;
    },
    setArchitectures: (state, action) => {
      state.architectures = action.payload;
    },
    setMonumets: (state, action) => {
      state.monuments = action.payload;
    },
  },
});

export const { setSculptures, setArchitectures, setMonumets } =
  artSlice.actions;

export const selectSculptures = (state) => state.art.sculptures;
export const selectArchitectures = (state) => state.art.architectures;
export const selectMonumets = (state) =>
  state.art.monuments;

export default artSlice.reducer;
