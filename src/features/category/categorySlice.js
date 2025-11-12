import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("user"))
    : [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
      localStorage.setItem(
        "categories",
        JSON.stringify(action.payload.categories)
      );
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
