import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  updatePriceCompletedAction,
  updatePriceErrorAction,
  updatePriceInitiatedAction,
  updateRoomCompletedAction,
  updateRoomErrorAction,
  updateRoomInitiatedAction,
} from "../slice/roomSlice";
import { Room } from "../../models/room";
import { updatePrice, updateRoom } from "../../api/room";

function* readingUpdate(action: PayloadAction<Room>): Generator {
  try {
    const data = (yield call(updateRoom, action.payload)) as any as Room;
    yield put(updateRoomCompletedAction(data));
  } catch (error: any) {
    yield put(updateRoomErrorAction(error));
  }
}

function* priceUpdate(action: PayloadAction<number>): Generator {
  try {
    const data = (yield call(updatePrice, action.payload)) as any as number;
    yield put(updatePriceCompletedAction(data));
  } catch (error: any) {
    yield put(updatePriceErrorAction(error));
  }
}

function* roomSaga() {
  yield takeEvery(updateRoomInitiatedAction, readingUpdate);
  yield takeEvery(updatePriceInitiatedAction, priceUpdate);
}

export default roomSaga;
