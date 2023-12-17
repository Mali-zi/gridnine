import { FlightElement } from '../modals';
import CardSection from './CardSection';

export default function Card({ item }: {
  item: FlightElement;
}) {
  return (
    <div className="main-card">
      <div className="main-card-header">
        <span className="airline-logo">Logo</span>
        <div className="d-flex flex-column text-white align-items-end pe-2">
          <h3 className="m-0 mt-1">{item.flight.price.total.amount} &#8381;</h3>
          <p className="price-term">Стоимость для одного взрослого пассажира</p>
        </div>
      </div>
      <section id="card-top">
        <CardSection leg={item.flight.legs[0]} />
      </section>
      <div className="mt-1 center-line" />
      <section id="card-bottom">
        <CardSection leg={item.flight.legs[1]} />
      </section>
      <button type="button" className="main-card-button">
        ВЫБРАТЬ
      </button>
    </div>
  );
}
