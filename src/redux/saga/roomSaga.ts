import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchRoomsCompletedAction,
  fetchRoomsErrorAction,
  fetchRoomsInitiatedAction,
  updateDataAction,
  updatePriceCompletedAction,
  updatePriceErrorAction,
  updatePriceInitiatedAction,
  updateRoomCompletedAction,
  updateRoomErrorAction,
  updateRoomInitiatedAction,
} from "../slice/roomSlice";
import { FetchRoomsPayload, Room } from "../../models/room";
import {
  fetchRooms,
  updateData,
  updatePrice,
  updateRoom,
} from "../../api/room";

function* fetchingRoom(): Generator {
  try {
    const data = (yield call(fetchRooms)) as any as FetchRoomsPayload;
    yield put(fetchRoomsCompletedAction(data));
  } catch (error: any) {
    yield put(fetchRoomsErrorAction(error));
  }
}

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

function* updatingData(): Generator {
  try {
    const data = (yield call(updateData)) as any as FetchRoomsPayload;
    console.log("data", data);
    yield put(fetchRoomsCompletedAction(data));
  } catch (error: any) {
    yield put(fetchRoomsErrorAction(error));
  }
}

function* roomSaga() {
  yield takeEvery(fetchRoomsInitiatedAction, fetchingRoom);
  yield takeEvery(updateRoomInitiatedAction, readingUpdate);
  yield takeEvery(updatePriceInitiatedAction, priceUpdate);
  yield takeEvery(updateDataAction, updatingData);
}

export default roomSaga;
