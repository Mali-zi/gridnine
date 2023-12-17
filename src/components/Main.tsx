import Card from './Card';
import './Main.css';
import { useAppSelector } from '../app/hooks';

export default function Main() {
  const flights = useAppSelector((state) => state.flights.flights);

  const flightList = flights.map((item) => {
    return (
      <li key={item.flightToken}>
        <Card item={item} />
      </li>
    );
  });
  
  return (
    <section id="main" className="p-3">
      <ul className="d-flex flex-column justify-content-start bg-white">
        {flightList}
      </ul>
    </section>
  );
}
