import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=34.88&lon=35.88&appid=f201e06b99b232f89a0de1ee0d6b4b2f"
    );

    // handle success
    let name = response.data.name;
    let number = Math.round(response.data.main.temp - 272.15);
    let description = response.data.weather[0].description;
    let min = Math.round(response.data.main.temp_min - 272.15);
    let max = Math.round(response.data.main.temp_max - 272.15);
    let responseIcon = response.data.weather[0].icon;
    // setTemp({
    //   name,
    //   number,
    //   description,
    //   min,
    //   max,
    //   icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    // });
    return {
      name,
      number,
      description,
      min,
      max,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    weather: {},
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default weatherApiSlice.reducer;
