import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryKey, CategoryText } from "../common/types";

export type Transaction = {
  id?: string;
  description: string;
  amount: number;
  category: CategoryText;
  key: CategoryKey;
  date: Date;
};

export type Summary = Record<string, number>;

type TransactionState = {
  description: string;
  amount: number;
  allTransactions: Transaction[];
  summary: Summary;
  income: number;
  expense: number;
  transactionFilter: string;
};

const summary: Summary = {};

const initialState: TransactionState = {
  description: "",
  amount: 0,
  allTransactions: [],
  summary,
  income: 0,
  expense: 0,
  transactionFilter: '',
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    changeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    changeAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    addTransaction: (
      state,
      action: PayloadAction<{ category: CategoryText; key: CategoryKey, id: string, amount: number, description: string }>
    ) => {
      const { category, key, id, amount, description } = action.payload;
      state.allTransactions = [
        ...state.allTransactions,
        {
          id,
          description: description,
          amount: amount,
          category: category,
          key: key,
          date: new Date(),
        },
      ];
      state.summary[category] =
        state.summary[category] === undefined
          ? amount
          : state.summary[category] + amount;
      state[key] = state[key] + amount;
    },
    updateTransactions: (
      state,
      action: PayloadAction<{ transactions: Transaction[] }>
    ) => {
      const { transactions } = action.payload;
      state.allTransactions = [...transactions];
      state.summary = transactions.reduce<Record<string, number>>(
        (acc, { category, amount }) => {
          acc[category as string] =
            acc[category] === undefined ? amount : acc[category] + amount;
          return acc;
        },
        {}
      );
      state.income = transactions
        .filter(({ key }) => key === "income")
        .reduce((acc, { amount }) => (acc = acc + amount), 0),
      state.expense = transactions
          .filter(({ key }) => key === "expense")
          .reduce((acc, { amount }) => (acc = acc + amount), 0);
    },
    updateTransactionFilter: (state, action: PayloadAction<string>) => {
      state.transactionFilter = action.payload;
    }
  },
});

export const {
  changeDescription,
  changeAmount,
  addTransaction,
  updateTransactions,
  updateTransactionFilter
} = transactionSlice.actions;

export default transactionSlice.reducer;
