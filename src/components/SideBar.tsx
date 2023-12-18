import React, { useEffect, useState } from 'react';
import './SideBar.css';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setAirlines,
  setCurentAirline,
  setfilterFlights,
  setPrice,
  setSortFlights,
} from '../store/flightSlice';

const sortTerms = [
  '- по возрастанию цены',
  '- по убыванию цены',
  '- по времени в пути',
];

const filterTerms = ['- 1 пересадка', '- без пересадок'];

export default function SideBar() {
  const dispatch = useAppDispatch();
  const flights = useAppSelector((state) => state.flights.flights);
  const airlines = useAppSelector((state) => state.flights.airlines);
  const curentAirline = useAppSelector((state) => state.flights.curentAirline);

  const curentFilterTerm = useAppSelector(
    (state) => state.flights.curentFilterTerm
  );
  const curentSortTerm = useAppSelector(
    (state) => state.flights.curentSortTerm
  );

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  const sortSection = sortTerms.map((sortTerm, index) => {
    return (
      <li key={index} className="form-check my-0">
        <input
          type="radio"
          className="form-check-input"
          name={`sortTerm-${index}`}
          id={`sortTerm-${index}`}
          value={sortTerm}
          checked={curentSortTerm === sortTerm}
          onChange={() => {
            dispatch(setSortFlights(sortTerm));
          }}
        />
        <label className="form-check-label" htmlFor={`sortTerm-${index}`}>
          {sortTerm}
        </label>
      </li>
    );
  });

  const filterSection = filterTerms.map((filterTerm, index) => {
    return (
      <li key={index} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name={`filterTerm-${index}`}
          id={`filterTerm-${index}`}
          value={filterTerm}
          checked={curentFilterTerm === filterTerm}
          onChange={() => {
            dispatch(setfilterFlights(filterTerm));
            dispatch(setPrice({ minPrice, maxPrice }));
            dispatch(setSortFlights(curentSortTerm));
          }}
        />
        <label
          className="form-check-label my-0"
          htmlFor={`filterTerm-${index}`}
        >
          {filterTerm}
        </label>
      </li>
    );
  });

  const airlineSection = airlines.map((airline, index) => {
    return (
      <li
        key={index}
        className="form-check d-flex flex-row justify-content-start"
      >
        <input
          type="checkbox"
          className="form-check-input"
          name={`airline-${index}`}
          id={`airline-${index}`}
          value={airline.caption}
          checked={curentAirline === airline.caption}
          onChange={() => {
            dispatch(setfilterFlights(curentFilterTerm));
            dispatch(setPrice({ minPrice, maxPrice }));
            dispatch(setCurentAirline(airline.caption));
            dispatch(setSortFlights(curentSortTerm));
          }}
        />
        <label
          className="form-check-label ms-1 text-truncate"
          htmlFor={`airline-${index}`}
        >
          {airline.caption}
        </label>
        <span className="ms-2 flex-fill">от&nbsp;{airline.minPrice}&nbsp;р.</span>
      </li>
    );
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setfilterFlights(curentFilterTerm));
    dispatch(setPrice({ minPrice, maxPrice }));
    dispatch(setSortFlights(curentSortTerm));
  }

  useEffect(() => {
    dispatch(setAirlines());
  }, [flights]);

  return (
    <section id="side-bar" className="p-3">
      <div className="d-flex flex-column justify-content-start text-start side-bar-center">
        <div className="side-bar">
          <div className="side-bar-sec">
            <h5 className="mb-3">Сортировать</h5>
            {sortSection}
          </div>
          <div className="side-bar-sec mb-0">
            <h5 className="my-2">Фильтровать</h5>
            {filterSection}
          </div>
          <form
            className="d-flex flex-column side-bar-sec mt-2 mb-0"
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <h5 className="my-2">Цена</h5>
            <div className="d-flex flex-row my-2">
              <label htmlFor="minPrice">От</label>
              <input
                type="text"
                // pattern="[0-9]"
                name="minPrice"
                id="minPrice"
                className="ms-1 w-100 me-4"
                value={minPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(Number(e.target.value))
                }
              />
            </div>
            <div className="d-flex flex-row my-2">
              <label htmlFor="maxPrice">До</label>
              <input
                type="text"
                // pattern="[0-9]"
                name="maxPrice"
                id="maxPrice"
                className="ms-1 w-100 me-4"
                value={maxPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(Number(e.target.value))
                }
              />
            </div>
            <input type="submit" hidden />
          </form>
          <div className="side-bar-sec mt-2 mb-4">
            <h5 className="mb-3">Авиакомпании</h5>
            {airlineSection}
          </div>
        </div>
      </div>
    </section>
  );
}
