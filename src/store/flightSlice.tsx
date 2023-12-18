import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import data from '../const/flights.json';
import { Flights, Leg } from '../modals';

export interface INewFlight {
  carrier: string;
  price: string;
  legs: Leg[];
}

const flightsData: Flights = data as Flights;
const getFlights = flightsData.result.flights;
const initFlights: INewFlight[] = [];
getFlights.map((flight) => {
  initFlights.push({
    carrier: flight.flight.carrier.caption,
    price: flight.flight.price.total.amount,
    legs: flight.flight.legs,
  });
});

const airlineCaptions = [
  'Air Baltic Corporation A/S',
  'Air France',
  'Alitalia Societa Aerea Italiana',
  'Austrian Airlines',
  'British Airways p.l.c.',
  'Brussels Airlines',
  'Finnair Oyj',
  'KLM',
  'LOT Polish Airlines',
  'Pegasus Hava Tasimaciligi A.S.',
  'SWISS International Air Lines Ltd',
  'TURK HAVA YOLLARI A.O.',
  'Аэрофлот - российские авиалинии',
  'ГТК Россия',
];

interface IAirlines {
  caption: string;
  minPrice: number;
}

const initAirlines: IAirlines[] = [{caption: 'Все', minPrice: 0}];

export const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: initFlights,
    sortFlights: initFlights,
    filterFlights: initFlights,
    curentFilterTerm: '',
    curentSortTerm: '',
    minPrice: 0,
    maxPrice: 200000,
    airlines: initAirlines,
    curentAirline: '',
  },
  reducers: {
    setAirlines: (state) => {
      const arr: IAirlines[] = [];
      airlineCaptions.map((caption) => {
        const newArr = initFlights.filter(
          (flight) => flight.carrier === caption
        );
        newArr.sort((a, b) => Number(a.price) - Number(b.price));
        newArr.length > 0 &&
          arr.push({ caption: caption, minPrice: Number(newArr[0].price) });
      });
      state.airlines = initAirlines.concat(arr);
    },

    setCurentAirline: (state, action) => {
      state.curentAirline = action.payload;
      if (action.payload && action.payload !== 'Все') {
        const newArr = initFlights.filter(
          (flight) => flight.carrier === action.payload
        );
        state.flights = newArr;
      } else {
        state.flights = initFlights;
      }
    },

    setfilterFlights: (state, action) => {
      if (action.payload) {
        state.curentFilterTerm = action.payload;

        if (action.payload === '- 1 пересадка') {
          const arr = state.flights.filter((flight) => {
            const rr = flight.legs.every((leg) => leg.segments.length > 1);
            return rr;
          });
          state.flights = arr;
        }

        if (action.payload === '- без пересадок') {
          const arr = state.flights.filter((flight) => {
            const rr = flight.legs.every((leg) => leg.segments.length < 2);
            return rr;
          });
          state.flights = arr;
        }
      }
    },

    setSortFlights: (state, action) => {
      if (action.payload) {
        state.curentSortTerm = action.payload;
        if (action.payload === '- по возрастанию цены') {
          state.flights.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (action.payload === '- по убыванию цены') {
          state.flights.sort((a, b) => Number(b.price) - Number(a.price));
        }
        if (action.payload === '- по времени в пути') {
          state.flights.sort(
            (a, b) => a.legs[0].duration - b.legs[0].duration
          );
        }
      }
    },

    setPrice: (
      state,
      action: PayloadAction<{ minPrice: string; maxPrice: string }>
    ) => {
      state.minPrice = Number(action.payload.minPrice);
      state.maxPrice = Number(action.payload.maxPrice);
      let arr;
      if (state.minPrice) {
        arr = state.flights.filter((flight) => {
          const price = Number(flight.price);
          return price > state.minPrice;
        });
        state.flights = arr;
      }
      if (state.maxPrice) {
        arr = state.flights.filter((flight) => {
          const price = Number(flight.price);
          return price < state.maxPrice;
        });
        state.flights = arr;
      }
    },
  },
});

export const {
  setfilterFlights,
  setSortFlights,
  setPrice,
  setAirlines,
  setCurentAirline,
} = flightSlice.actions;
export default flightSlice.reducer;
