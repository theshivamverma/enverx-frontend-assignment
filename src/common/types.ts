import store from '../store';
import { categories } from './constant';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type Category = {
  text: string;
  key: "income" | "expense";
};

export type CategoryKey = (typeof categories)[number]["key"];
export type CategoryText = string;