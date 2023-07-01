import { call, takeEvery, put, } from 'redux-saga/effects';
import { Transaction, addTransaction, updateTransactions } from '../transactionSlice';
import { sagaActions } from './sagaActions';

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../db/firestore";
import { updateDBErrMsg } from '../errorSlice';

const addDataToDB = async ({
  collectionName,
  collectionData,
}: {
  collectionName: string;
  collectionData: Record<string, string | number>;
}) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...collectionData,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

let readDataFromDB = async ({
  collectionName,
}: {
  collectionName: string;
}) => {
  return await getDocs(collection(db, collectionName)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return newData;
  });
};

export function* addTransactionSaga(action: any) {
  try {
    const {category, key, amount, description} = action.payload.transaction
    let id: string = yield call(() =>
      addDataToDB({
        collectionName: "expenses", 
        collectionData: action.payload.transaction
      })
    );
    yield put(addTransaction({
      category,
      key,
      id, 
      amount,
      description
    }));
  } catch (e) {
    yield put(updateDBErrMsg('Something went wrong'));
  }
}

export function* setTransactionSaga() {
  try {
    let transactions: Transaction[] = yield call(() =>
      readDataFromDB({
        collectionName: "expenses",
      })
    );
    yield put(updateTransactions({ transactions }));
  } catch (e) {
    yield put(updateDBErrMsg("Something went wrong"));
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.ADD_TRANSACTION_SAGA, addTransactionSaga);
  yield takeEvery(sagaActions.SET_TRANSACTION_SAGA, setTransactionSaga);
}