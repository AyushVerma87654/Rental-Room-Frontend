import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const roomSelector = (state: AppState) => state.room;

export const roomsSelector = createSelector(
  [roomSelector],
  (state) => state.rooms
);

export const roomsMapSelector = createSelector([roomsSelector], (state) =>
  Object.values(state)
);

export const selectedRoomIdSelector = createSelector(
  [roomSelector],
  (state) => state.selectedRoomId
);

export const individualRoomSelector = createSelector(
  [roomsSelector, selectedRoomIdSelector],
  (rooms, selectedRoomId) => rooms[selectedRoomId]
);

export const isEditingSelector = createSelector(
  [roomSelector],
  (state) => state.isEditing
);

export const pricePerUnitSelector = createSelector(
  [roomSelector],
  (state) => state.pricePerUnit
);

export const selectedBillingRoomIdSelector = createSelector(
  [roomSelector],
  (state) => state.selectedBillingRoomId
);

export const selectedBillingRoomSelector = createSelector(
  [roomsSelector, selectedBillingRoomIdSelector],
  (rooms, selectedBillingRoomId) => rooms[selectedBillingRoomId]
);

export const billingAmountSelector = createSelector(
  [roomSelector],
  (state) => state.billingAmount
);

export const isKitchenIncludedSelector = createSelector(
  [roomSelector],
  (state) => state.isKitchenIncluded
);

export const kitchenSelector = createSelector(
  [roomsSelector, isKitchenIncludedSelector],
  (rooms, isKitchenIncluded) => (isKitchenIncluded ? rooms["kitchen"] : {})
);

export const loadingSelector = createSelector(
  [roomSelector],
  (state) => state.loading
);

export const messageSelector = createSelector(
  [roomSelector],
  (state) => state.message
);
