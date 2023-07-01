import React from "react";
import {
  Box,
  List,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { formatDate } from "../common/utils";
import { updateTransactionFilter } from "../store/transactionSlice";

const ExpenseTable: React.FC = () => {
  const {
    transaction: { allTransactions, transactionFilter },
    categories: { allCategories },
  } = useAppSelector(({ transaction, categories }) => ({
    transaction,
    categories,
  }));

  const dispatch = useAppDispatch();

  const handleCategoryChange = (e: SelectChangeEvent<any>) => {
    dispatch(updateTransactionFilter(e.target.value));
  };

  const filteredTransactions = transactionFilter
    ? allTransactions.filter(({ category }) => category === transactionFilter)
    : allTransactions;

  return (
    <Box mt={{ xs: 4, sm: 2, md: 0 }} padding={2}>
      <Box
        mb={{ xs: 3, sm: 3, md: 2 }}
        width="100%"
        textAlign={"left"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography mb={2} variant="h6">
          Transactions
        </Typography>
        <Box width="50%">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              renderValue={() =>
                transactionFilter === "" ? "All" : transactionFilter
              }
              value={transactionFilter === "" ? "All" : transactionFilter}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem selected value="">
                All
              </MenuItem>
              {allCategories.map(({ text }: { text: string }) => (
                <MenuItem value={text}>{text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{height: '70vh', overflowY: 'scroll'}}>
        {filteredTransactions.length > 0 ? (
          <List>
            {filteredTransactions.map(
              ({ id, amount, description, date, category, key }) => {
                return (
                  <Box
                    key={id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    bgcolor={key === "expense" ? "#ffebee" : "#e8f5e9"}
                    padding={2}
                    mb={2}
                    borderRadius={3}
                  >
                    <Box width="100%" textAlign="left">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" fontSize={16}>
                          $ {amount}
                        </Typography>
                        <Typography variant="h6" fontSize={16}>
                          {category}
                        </Typography>
                        <Typography variant="h6" fontSize={16}>
                          {formatDate((date as Date) ?? new Date())}
                        </Typography>
                      </Box>
                      <Typography mt={1} fontWeight={300} variant="subtitle2">
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            )}
          </List>
        ) : (
          <Typography mt={3}>No records to display</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ExpenseTable;
