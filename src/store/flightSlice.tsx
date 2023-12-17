import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import data from '../const/flights.json';
import { Flights } from '../modals';

const flightsData: Flights = data as Flights;
const initFlights = flightsData.result.flights;

export const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: initFlights,
    curentFilterTerm: '',
  },
  reducers: {
    filterFlights: (state, action) => {
      state.curentFilterTerm = action.payload;

      if (action.payload === '- 1 пересадка') {
        state.flights = state.flights.filter((flight) => flight.flight.legs.every((leg) => leg.segments.length > 1));
      }

      // if (action.payload === '- без пересадок') {
      //   state.flights = state.flights.filter((flight) => {
      //     flight.flight.legs.every((leg) => leg.segments.length < 2);
      //   });
      // }
    },
  },
});

export const { filterFlights } = flightSlice.actions;
export default flightSlice.reducer;
