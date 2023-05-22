import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:7071";

//Thunks
export const fetchImages = createAsyncThunk("events/fetchImages", async () => {
  try {
    const response = await axios.get(`${baseURL}/events`);

    return response.data.scanResults;
  } catch (error) {}
});

//Selectors
const selectImages = (state) => state.events.images;
const selectFilter = (state) => state.events.filter;

export const selectFilteredImages = createSelector(
  [selectImages, selectFilter],
  (images, filter) => {
    if (filter) return images.filter((item) => item.detectionsList.length > 0);

    return images;
  }
);

//Slice
export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    filter: false,
    status: "idle",
    error: null,
    images: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        toast.error("Error retrieving events", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = eventsSlice.actions;

export default eventsSlice.reducer;
