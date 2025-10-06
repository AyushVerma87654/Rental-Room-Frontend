import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchRoomsPayload, Room, Rooms } from "../../models/room";

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
  rooms: {},
  selectedRoomId: "",
  isEditing: false,
  pricePerUnit: 0,
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
    fetchRoomsInitiated,
    fetchRoomsCompleted,
    fetchRoomsError,
    updateData,
  },
});

const { actions, reducer: roomReducer } = roomSlice;

export const {
  fetchRoomsInitiated: fetchRoomsInitiatedAction,
  fetchRoomsCompleted: fetchRoomsCompletedAction,
  fetchRoomsError: fetchRoomsErrorAction,
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
  updateData: updateDataAction,
} = actions;

export default roomReducer;

function fetchRoomsInitiated(state: RoomState) {
  state.loading = true;
}

function fetchRoomsCompleted(
  state: RoomState,
  action: PayloadAction<FetchRoomsPayload>
) {
  action.payload.rooms.forEach((room) => {
    state.rooms = { ...state.rooms, [room.roomId]: room };
  });
  console.log("state.rooms", state.rooms);
  state.pricePerUnit = action.payload.price;
  state.loading = false;
}

function fetchRoomsError(state: RoomState, action: PayloadAction<string>) {
  state.loading = false;
  state.message = action.payload;
}

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

function updateData(_state: RoomState) {}
