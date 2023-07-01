import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ErrorState = {
  amountErrMsg: string;
  categoryErrMsg: string;
  descErrMsg: string;
  dbErrorMsg: string;
};

const initialState: ErrorState = {
  amountErrMsg: '',
  categoryErrMsg: '',
  descErrMsg: '',
  dbErrorMsg: ''
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateAmountErr: (state, action: PayloadAction<string>) => {
      state.amountErrMsg = action.payload;
    },
    updateCategoryErr: (state, action: PayloadAction<string>) => {
      state.categoryErrMsg = action.payload;
    },
    updateDescErr: (state, action: PayloadAction<string>) => {
      state.descErrMsg = action.payload;
    },
    updateDBErrMsg: (state, action: PayloadAction<string>) => {
      state.dbErrorMsg = action.payload;
    }
  },
});

export const { updateAmountErr, updateCategoryErr, updateDescErr, updateDBErrMsg } =
  errorSlice.actions;

export default errorSlice.reducer;
