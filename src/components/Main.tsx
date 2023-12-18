import Card from './Card';
import './Main.css';
import { useAppSelector } from '../app/hooks';

export default function Main() {
  const flights = useAppSelector((state) => state.flights.flights);

  const flightList = flights.map((item, index) => {
    return (
      <li key={index}>
        <Card item={item} />
      </li>
    );
  });

  return (
    <section id="main" className="p-3">
      {flights.length > 0 ? (
        <ul className="d-flex flex-column justify-content-start bg-white">
          {flightList}
        </ul>
      ) : (
        <div className="main-card notFound">Извините, по вашему запросу ничего не найдено</div>
      )}
    </section>
  );
}
