import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import categoryReducer from "./categorySlice";
import transactionReducer from "./transactionSlice";
import errorReducer from "./errorSlice";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    transaction: transactionReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga)

export default store;
