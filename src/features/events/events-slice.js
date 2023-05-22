import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:7071";

export const fetchImages = createAsyncThunk("events/fetchImages", async () => {
  try {
    const response = await axios.get(`${baseURL}/events`);

    return response.data.scanResults;
  } catch (error) {}
});

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    filter: "",
    status: "idle",
    error: null,
    images: [],
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

export default eventsSlice.reducer;
