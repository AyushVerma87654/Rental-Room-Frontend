import { all, fork } from "redux-saga/effects";
import roomSaga from "./roomSaga";

function* rootSaga() {
  yield all([fork(roomSaga)]);
}

export default rootSaga;
