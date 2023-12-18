import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import data from '../const/flights.json';
import { Flights, Leg } from '../modals';

interface INewFlight {
  carrier: string;
  price: string;
  legs: Leg[];
}

const flightsData: Flights = data as Flights;
const initFlights = flightsData.result.flights;
const newFlights: INewFlight[] = [];
initFlights.map((flight) => {
  newFlights.push({ carrier: flight.flight.carrier.caption,
    price: flight.flight.price.total.amount,
    legs: flight.flight.legs,
  })
});

const airlineCaptions = [
  "Air Baltic Corporation A/S",
  "Air France",
  "Alitalia Societa Aerea Italiana",
  "Austrian Airlines",
  "British Airways p.l.c.",
  "Brussels Airlines",
  "Finnair Oyj",
  "KLM",
  "LOT Polish Airlines",
  "Pegasus Hava Tasimaciligi A.S.",
  "SWISS International Air Lines Ltd",
  "TURK HAVA YOLLARI A.O.",
  "Аэрофлот - российские авиалинии",
  "ГТК Россия",
]

interface IAirlines {
  caption: string;
  minPrice: number;
}

const initAirlines: IAirlines[] = [];

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
    setCurentAirline: (state, action) => {
      if (action.payload && state.curentAirline !== action.payload) {
        const newArr = state.filterFlights.filter(flight => flight.flight.carrier.caption === action.payload);
        state.filterFlights = newArr;  
      }
    },

    setAirlines: (state) => {
      const arr: IAirlines[] = [];
      airlineCaptions.map(caption => {
        const newArr = state.flights.filter(flight => flight.flight.carrier.caption === caption);
        newArr.sort((a, b) => Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount));
        newArr.length > 0 && arr.push({caption: caption, minPrice: Number(newArr[0].flight.price.total.amount)});
      })
      state.airlines = arr;
    },

    setfilterFlights: (state, action) => {
      if (action.payload && state.curentFilterTerm !== action.payload) {
        state.curentFilterTerm = action.payload;

        if (action.payload === '- 1 пересадка') {
          state.curentFilterTerm = action.payload;
          const arr = initFlights.filter((flight) => {
            const rr = flight.flight.legs.every((leg) => leg.segments.length > 1);
            return rr;
          });
          state.filterFlights = arr;
        }
  
        if (action.payload === '- без пересадок') {
          state.curentFilterTerm = action.payload;
          const arr = initFlights.filter((flight) => {
            const rr = flight.flight.legs.every((leg) => leg.segments.length < 2);
            return rr;
          });
          state.filterFlights = arr;
        }  
      }
    },

    setSortFlights: (state, action) => {
      if (action.payload && state.curentSortTerm !== action.payload) {
        state.curentSortTerm = action.payload;
        if (action.payload === '- по возрастанию цены') {
          state.filterFlights.sort(
            (a, b) =>
              Number(a.flight.price.total.amount) -
              Number(b.flight.price.total.amount)
          );
        }
        if (action.payload === '- по убыванию цены') {
          state.filterFlights.sort(
            (a, b) =>
              Number(b.flight.price.total.amount) -
              Number(a.flight.price.total.amount)
          );
        }
        if (action.payload === '- по времени в пути') {
          state.filterFlights.sort(
            (a, b) => a.flight.legs[0].duration - b.flight.legs[0].duration
          );
        }
        state.flights = state.filterFlights;  
      }
    },

    setPrice: (
      state,
      action: PayloadAction<{ minPrice: number; maxPrice: number }>
    ) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      const arr = state.filterFlights.filter((flight) => {
        const price = Number(flight.flight.price.total.amount);
        return (price > action.payload.minPrice && price < action.payload.maxPrice)
      });
      state.filterFlights = arr;
    },
  },
});

export const { setfilterFlights, setSortFlights, setPrice, setAirlines, setCurentAirline } =
  flightSlice.actions;
export default flightSlice.reducer;
