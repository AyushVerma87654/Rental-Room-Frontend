import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, Rooms } from "../../models/room";
import { initialRooms } from "../../data";

export type RoomState = {
  rooms: Rooms;
  selectedRoomId: string;
  isEditing: boolean;
  pricePerUnit: number;
  selectedBillingRoomId: string;
  billingAmount: number;
  isKitchenIncluded: boolean;
  loading: boolean;
  message: string;
};

const initialState: RoomState = {
  rooms: initialRooms,
  selectedRoomId: "",
  isEditing: false,
  pricePerUnit: 5,
  selectedBillingRoomId: "",
  billingAmount: 0,
  isKitchenIncluded: false,
  loading: true,
  message: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoomInitiated,
    updateRoomCompleted,
    updateRoomError,
    setSelectedRoomId,
    toggleIsEditing,
    setSelectedBillingRoomId,
    setPricePerUnit,
    toggleIsKitchenIncluded,
    updatePriceInitiated,
    updatePriceCompleted,
    updatePriceError,
    setBillingAmount,
  },
});

const { actions, reducer: roomReducer } = roomSlice;

export const {
  updateRoomInitiated: updateRoomInitiatedAction,
  updateRoomCompleted: updateRoomCompletedAction,
  updateRoomError: updateRoomErrorAction,
  setSelectedRoomId: setSelectedRoomIdAction,
  toggleIsEditing: toggleIsEditingAction,
  setSelectedBillingRoomId: setSelectedBillingRoomIdAction,
  setBillingAmount: setBillingAmountAction,
  setPricePerUnit: setPricePerUnitAction,
  toggleIsKitchenIncluded: toggleIsKitchenIncludedAction,
  updatePriceInitiated: updatePriceInitiatedAction,
  updatePriceCompleted: updatePriceCompletedAction,
  updatePriceError: updatePriceErrorAction,
} = actions;

export default roomReducer;

function updateRoomInitiated(state: RoomState, _action: PayloadAction<Room>) {
  state.loading = true;
}

function updateRoomCompleted(state: RoomState, action: PayloadAction<Room>) {
  state.rooms = {
    ...state.rooms,
    [action.payload.roomId]: action.payload,
  };
  state.loading = false;
}

function updateRoomError(state: RoomState, action: PayloadAction<string>) {
  state.loading = false;
  state.message = action.payload;
}

function setSelectedRoomId(state: RoomState, action: PayloadAction<string>) {
  state.selectedRoomId = action.payload;
}

function toggleIsEditing(state: RoomState) {
  state.isEditing = !state.isEditing;
}

function setSelectedBillingRoomId(
  state: RoomState,
  action: PayloadAction<string>
) {
  state.selectedBillingRoomId = action.payload;
  state.isKitchenIncluded = false;
}

function setBillingAmount(state: RoomState, action: PayloadAction<number>) {
  state.billingAmount = action.payload;
}

function setPricePerUnit(state: RoomState, action: PayloadAction<number>) {
  state.pricePerUnit = action.payload;
}

function toggleIsKitchenIncluded(state: RoomState) {
  state.isKitchenIncluded = !state.isKitchenIncluded;
}

function updatePriceInitiated(
  state: RoomState,
  _action: PayloadAction<number>
) {
  state.loading = true;
}

function updatePriceCompleted(state: RoomState, action: PayloadAction<number>) {
  state.pricePerUnit = action.payload;
  state.loading = false;
}

function updatePriceError(state: RoomState, action: PayloadAction<string>) {
  state.loading = false;
  state.message = action.payload;
}
