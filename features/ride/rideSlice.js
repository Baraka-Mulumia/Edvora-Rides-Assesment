import { createSlice } from "@reduxjs/toolkit";
import { isFuture, isPast } from "../../lib/fns";

const initialState = {
  rides: [],
  cityFilter: null,
  stateFilter: null,
  geoFilteredRides: [],
  timeFilter: null,
  pastRides: [],
  upcomingRides: [],
};

export const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRides: (state, action) => {
      state.rides = action.payload;
      state.geoFilteredRides = action.payload;
      state.pastRides = action.payload.filter((ride) => isPast(ride.date));
      state.upcomingRides = action.payload.filter((ride) =>
        isFuture(ride.date)
      );
    },

    filterByCity: (state, action) => {
      state.cityFilter = action.payload;
      const rides = state.rides.filter((ride) => ride.city === action.payload);
      state.geoFilteredRides = rides;
    },

    filterByState: (state, action) => {
      state.stateFilter = action.payload;
      state.cityFilter = null;
      const rides = state.rides.filter((ride) => ride.state === action.payload);
      state.geoFilteredRides = rides;
    },

    filterByStateAndCity: (state, action) => {
      const { selectedState, selectedCity } = action.payload;
      state.cityFilter = selectedCity;
      state.stateFilter = selectedState;
      const rides = state.rides.filter(
        (ride) => ride.state === selectedState && ride.city === selectedCity
      );
      state.geoFilteredRides = rides;
    },

    showUpcomingRides: (state) => {
      state.timeFilter = "Upcoming Rides";
      const upcomingRides = state.rides.filter((ride) => isFuture(ride.date));
      state.upcomingRides = upcomingRides;
      state.geoFilteredRides = upcomingRides;
      state.cityFilter = null;
      state.stateFilter = null;
    },

    showPastRides: (state) => {
      state.timeFilter = "Past Rides";
      const pastRides = state.rides.filter((ride) => isPast(ride.date));
      state.pastRides = pastRides;
      state.geoFilteredRides = pastRides;
      state.cityFilter = null;
      state.stateFilter = null;
    },
    showNearestRides: (state) => {
      state.timeFilter = null;
    },
  },
});

export const {
  setRides,
  filterByCity,
  filterByState,
  filterByStateAndCity,
  showUpcomingRides,
  showPastRides,
  showNearestRides,
} = ridesSlice.actions;

export const selectAllRides = (state) => state.rides.rides;
export const selectRides = (state) => state.rides.geoFilteredRides;

export const selectPastRides = (state) => state.rides.pastRides;

export const selectUpcomingRides = (state) => state.rides.upcomingRides;

export const selectCityFilter = (state) => state.rides.cityFilter;
export const selectStateFilter = (state) => state.rides.stateFilter;
export const selectTimeFilter = (state) => state.rides.timeFilter;

export default ridesSlice.reducer;
