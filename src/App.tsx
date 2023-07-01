import React from "react";
import { Typography, Box, Grid, Alert } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";

import "./App.css";
import ExpenseTable from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { useAppSelector } from "./common/hooks";

const App: React.FC = () => {
  const {
    error: { dbErrorMsg },
  } = useAppSelector(({ error }) => ({ error }));
  return (
    <Box height="100vh" mt={0}>
      <Typography
        textAlign="center"
        variant="h4"
        mb={{ md: 0, xs: 2 }}
        mt={{ md: 0, xs: 2 }}
      >
        Expense Tracker App
      </Typography>
      {dbErrorMsg && (
        <Alert
          severity="error"
          sx={{ position: "absolute", bottom: "10px", right: "10px" }}
        >
          {dbErrorMsg}
        </Alert>
      )}
      <Grid
        container
        padding={{ xs: 1, sm: 1, md: 2 }}
        columnGap={2}
        columns={{ xs: 1, sm: 1, md: 13 }}
      >
        <Grid item xs={1} md={4}>
          <ExpenseForm />
        </Grid>
        <Grid item xs={1} md={4}>
          <ExpenseSummary />
        </Grid>
        <Grid item xs={1} md={4}>
          <ExpenseTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
