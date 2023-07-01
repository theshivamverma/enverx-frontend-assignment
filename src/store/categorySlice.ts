import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { categories } from "../common/constant";
import { Category, CategoryKey, CategoryText } from "../common/types";

type CategoryState = {
  allCategories: Category[];
  selectedKey: CategoryKey;
  selectedCategory: CategoryText;
};

const initialState: CategoryState = {
  allCategories: categories,
  selectedKey: 'income',
  selectedCategory: '',
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    changeKey: (state, action: PayloadAction<CategoryKey>) => {
      state.selectedKey = action.payload;
    },
    changeCategory: (state, action: PayloadAction<CategoryText>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { changeKey, changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
