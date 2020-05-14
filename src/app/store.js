import { configureStore, createSlice } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

const largeData = createSlice({
  name: "largeData",
  initialState: null,
  reducers: {
    setLargeData: (state, { payload }) => payload,
  },
});

const store = configureStore({
  reducer: {
    counter: counterReducer,
    largeData: largeData.reducer,
  },
  devTools: {
    stateSanitizer: (state) => ({ ...state, largeData: "Replaced Large Data" }),
    actionSanitizer: (action) =>
      action.type === "largeData/setLargeData"
        ? { ...action, payload: "Replaced Large Data" }
        : action,
  },
});

const { setLargeData } = largeData.actions;

store.dispatch(setLargeData(new ArrayBuffer(1e7)));
store.dispatch(setLargeData(null));

export default store;
