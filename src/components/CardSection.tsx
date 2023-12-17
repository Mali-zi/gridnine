import { Leg, Segment } from '../modals';

export default function CardSection({ leg }: { leg: Leg }) {
  const month = (num: number) => {
    const allMonths = [
      'янв.',
      'фев.',
      'март',
      'апр.',
      'май',
      'июнь',
      'июль',
      'авг.',
      'сент.',
      'окт.',
      'нояб.',
      'дек.',
    ];
    return allMonths[num];
  };

  const day = (num: number) => {
    const allDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return allDays[num];
  };

  const duration = (num: number) => {
    const hour = Math.floor(num / 60);
    const min = num - hour * 60;
    return `${hour} ч ${min} мин`;
  };

  const transfer = (arr: Segment[]) => {
    return arr.length - 1;
  };

  return (
    <div className="main-card-body px-4 py-2 fs-5">
      <div className="d-flex flex-row card-dir justify-content-between">
        <div className="card-dir-city">
          <span>
            {leg.segments[0].departureCity?.caption},&nbsp;
            {leg.segments[0].departureAirport.caption}
          </span>
          <span className="card-dir-blue">
            &nbsp;({leg.segments[0].departureAirport.uid})
          </span>
        </div>
        <div className="card-dir-blue mx-2 flex-fill">&#129042;</div>
        <div className="card-dir-city">
          <span>
            &nbsp;{leg.segments[transfer(leg.segments)].arrivalCity?.caption},&nbsp;
            {leg.segments[transfer(leg.segments)].arrivalAirport.caption}
          </span>
          <span className="card-dir-blue">
            &nbsp;({leg.segments[transfer(leg.segments)].arrivalAirport.uid})
          </span>
        </div>
      </div>
      <hr className="mx-2 my-2" />
      <div className="d-flex flex-row justify-content-between pe-4">
        <div>
          <span className="me-1 fs-3">
            {String(
              new Date(leg.segments[0].departureDate).getHours()
            ).padStart(2, '0')}
            &#58;
            {String(
              new Date(leg.segments[0].departureDate).getMinutes()
            ).padStart(2, '0')}
          </span>
          <span className="card-dir-blue">
            {String(new Date(leg.segments[0].departureDate).getDate())}
            &nbsp;
            {month(new Date(leg.segments[0].departureDate).getMonth())}
            &nbsp;
            {day(new Date(leg.segments[0].departureDate).getDay())}
          </span>
        </div>
        <div className="align-self-center">
          <i className="bi bi-clock fs-5"></i>
          <span className="fs-4 ms-1">{duration(leg.duration)}</span>
        </div>
        <div>
          <span className="card-dir-blue">
          {String(new Date(leg.segments[transfer(leg.segments)].arrivalDate).getDate())}
            &nbsp;
            {month(new Date(leg.segments[transfer(leg.segments)].arrivalDate).getMonth())}
            &nbsp;
            {day(new Date(leg.segments[transfer(leg.segments)].arrivalDate).getDay())}
            </span>
          <span className="ms-1 fs-3">
            {String(new Date(leg.segments[transfer(leg.segments)].arrivalDate).getHours()).padStart(
              2,
              '0'
            )}
            &#58;
            {String(
              new Date(leg.segments[transfer(leg.segments)].arrivalDate).getMinutes()
            ).padStart(2, '0')}
          </span>
        </div>
      </div>
      {!!transfer(leg.segments) ? (
        <div className="d-flex flex-row justify-content-center align-items-center mb-1">
          <div className="main-line flex-fill ms-5 me-3" />
          <div className="main-line-title">
            {transfer(leg.segments)}&nbsp;пересадка
          </div>
          <div className="main-line flex-fill ms-3 me-5" />
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-center my-3 ">
          <div className="main-line flex-fill mx-5" />
        </div>
      )}
      <p className="align-self-start m-0 ">
        Рейс выполняет:&nbsp;{!transfer(leg.segments) ? leg.segments[transfer(leg.segments)].airline.caption : (
          leg.segments[transfer(leg.segments)].operatingAirline ? leg.segments[transfer(leg.segments)].operatingAirline?.caption : leg.segments[transfer(leg.segments)].airline.caption)}
      </p>
    </div>
  );
}
