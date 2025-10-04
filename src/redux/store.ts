import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import roomReducer from "./slice/roomSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { room: roomReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export default store;
