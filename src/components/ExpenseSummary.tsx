import React from 'react';
import {Stack, Divider, Typography, Box} from '@mui/material';
import { useAppSelector } from '../common/hooks';

const ExpenseSummary: React.FC = () => {
  const {transaction : {income, expense, summary}} = useAppSelector(({transaction}) => ({transaction}))
  return (
    <Box width="100%" mt={{ xs: 2, md: 0 }} padding={{ xs: 1, sm: 1, md: 2 }}>
      <Typography mb={2} variant="h6" textAlign="center">
        Summary
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="space-between"
        mb={{ xs: 3, sm: 3, md: 2 }}
      >
        <Typography
          padding={{ xs: 1, sm: 1, md: 2 }}
          borderRadius={2}
          bgcolor="#c8e6c9"
          variant="subtitle1"
        >
          Total Income: $ {income}
        </Typography>
        <Typography
          padding={{ xs: 1, sm: 1, md: 2 }}
          borderRadius={2}
          bgcolor="#ffcdd2"
          variant="subtitle1"
        >
          Total Expense: $ {expense}
        </Typography>
      </Stack>
      <Box sx={{overflowY: "scroll" }} height={{md: '60vh', xs: '40vh'}}>
        <Stack spacing={1} mt={3}>
          {Object.keys(summary).map((summaryKey) => (
            <Typography
              variant="subtitle1"
              bgcolor="#e1f5fe"
              padding={2}
              borderRadius={2}
              textAlign="left"
            >
              {summaryKey}: $ {summary[summaryKey]}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default ExpenseSummary