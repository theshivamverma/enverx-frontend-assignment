import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormGroup,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  Button,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  changeAmount,
  changeDescription,
} from "../store/transactionSlice";
import { changeCategory, changeKey } from "../store/categorySlice";
import { updateAmountErr, updateCategoryErr, updateDescErr } from "../store/errorSlice";
import { sagaActions } from "../store/sagas/sagaActions";
import { CategoryKey } from "../common/types";

const ExpenseForm: React.FC = () => {
  const {
    transaction: { description, amount },
    categories: { allCategories, selectedKey, selectedCategory },
    error: { amountErrMsg, categoryErrMsg, descErrMsg },
  } = useAppSelector(({ transaction, categories, error }) => ({
    transaction,
    categories,
    error
  }));

  const dispatch = useAppDispatch();

  const handleAmountChange = (amt: number) => {
    if(amountErrMsg && amt > 0){
      dispatch(updateAmountErr(''))
    }
    dispatch(changeAmount(amt));
  }

  const handleDescrChange = (desc: string) => {
    if(descErrMsg && desc){
      dispatch(updateDescErr(''))
    }
    dispatch(changeDescription(desc));
  }

  const handleCategoryChange = (e: SelectChangeEvent<any>) => {
    if(categoryErrMsg && e.target.value){
      dispatch(updateCategoryErr(''))
    }
    dispatch(changeCategory(e.target.value));
  };

  const handleKeyChange = (
    _: React.MouseEvent<HTMLElement>,
    value: CategoryKey
  ) => {
    dispatch(changeKey(value));
  };

  const handleAddRecord = async () => {
    if(amount === 0){
      dispatch(updateAmountErr('Amount cannot be 0'))
    }
    if(selectedCategory === ''){
      dispatch(updateCategoryErr('Category required'))
    }
    if(description === ''){
      dispatch(updateDescErr('Description required'))
    }
    if(amount && selectedCategory && description){
      dispatch(changeAmount(0));
      dispatch(changeDescription(""));
      dispatch(changeCategory(""));
      dispatch({
        type: sagaActions.ADD_TRANSACTION_SAGA,
        payload: {
          transaction: {
            amount,
            description,
            category: selectedCategory,
            key: selectedKey,
          },
        },
      });
    }
  };

  React.useEffect(() => {
    dispatch({ type: sagaActions.SET_TRANSACTION_SAGA })
  }, [])

  return (
    <Box width="100%" padding={{ xs: 3, sm: 2, md: 2 }}>
      <Typography mb={{ xs: 1 }} variant="h6" textAlign="center">
        Add Expense
      </Typography>
      <FormGroup>
        <Box width="100%" mb={2}>
          <ToggleButtonGroup
            color="primary"
            value={selectedKey}
            exclusive
            onChange={handleKeyChange}
            aria-label="Platform"
            fullWidth
          >
            <ToggleButton value="income">Income</ToggleButton>
            <ToggleButton value="expense">Expense</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box mb={2} width="100%" sx={{ display: "flex" }}>
          <Box width="50%" mr={2}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                value={amount ? amount : 0}
                error={amountErrMsg !== ""}
                onChange={(e) => handleAmountChange(parseInt(e.target.value))}
                helperText={amountErrMsg}
              />
            </FormControl>
          </Box>
          <Box width="50%" textAlign={"left"}>
            <FormControl fullWidth error={categoryErrMsg !== ""}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={selectedCategory === "" ? "None" : selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
                renderValue={() =>
                  selectedCategory === "" ? "None" : selectedCategory
                }
              >
                <MenuItem selected value="">
                  <em>None</em>
                </MenuItem>
                {allCategories
                  .filter(
                    ({ key }: { key: CategoryKey }) => key === selectedKey
                  )
                  .map(({ text }: { text: string }) => (
                    <MenuItem value={text}>{text}</MenuItem>
                  ))}
              </Select>
              {categoryErrMsg && (
                <FormHelperText>{categoryErrMsg}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
        <Box mb={2} width="100%">
          <FormControl fullWidth>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Expense Description"
              variant="outlined"
              value={description}
              error={descErrMsg !== ""}
              helperText={descErrMsg}
              onChange={(e) => handleDescrChange(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mb={2} width="100%">
          <Button onClick={handleAddRecord} variant="contained" fullWidth>
            Add To Record
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default ExpenseForm;
