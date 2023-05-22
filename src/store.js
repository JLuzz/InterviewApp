import { configureStore } from "@reduxjs/toolkit";

import eventsReducer from "./features/events/events-slice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
