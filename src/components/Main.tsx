import './Main.css';

export default function Main() {
  return (
    <section id="main" className="p-3">
      <div className="d-flex flex-column justify-content-start bg-white">
        <div className="main-card">
          <div className="main-card-header">
            <span className="airline-logo">Logo</span>
            <div className="d-flex flex-column text-white align-items-end pe-2">
              <h3 className="m-0 mt-1">21049 &#8381;</h3>
              <p className="price-term">
                Стоимость для одного взрослого пассажира
              </p>
            </div>
          </div>
          <section id="card-top">
            <div className="main-card-body px-4 py-2 fs-5">
              <div className="d-flex flex-row card-dir">
                <span>Москва, ШЕРЕМЕТЬЕВО</span>
                <span className="card-dir-blue">&nbsp;(SVO) &#129042;</span>
                <span>&nbsp;ЛОНДОН, Лондон, Хитроу</span>
                <span className="card-dir-blue">&nbsp;(LHR)</span>
              </div>
              <hr className="mx-2 my-2" />
              <div className="d-flex flex-row justify-content-between pe-4">
                <div>
                  <span className="me-1 fs-3">20:40</span>
                  <span className="card-dir-blue">18 авг. вт</span>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-clock fs-5"></i>
                  <span className="fs-4">14 ч 45 мин</span>
                </div>
                <div>
                  <span className="card-dir-blue">19 авг. ср</span>
                  <span className="ms-1 fs-3">09:25</span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center mb-1">
                <div className="main-line flex-fill ms-5 me-3" />
                <div className="main-line-title">1 пересадка</div>
                <div className="main-line flex-fill ms-3 me-5" />
              </div>
              <p className="align-self-start m-0 ">
                Рейс выполняет: LOT Polish Airlines
              </p>
            </div>
          </section>
          <div className="mt-1 center-line" />
          <section id="card-bottom">
          <div className="main-card-body px-4 py-2 fs-5">
              <div className="d-flex flex-row card-dir">
                <span>Москва, ШЕРЕМЕТЬЕВО</span>
                <span className="card-dir-blue">&nbsp;(SVO) &#129042;</span>
                <span>&nbsp;ЛОНДОН, Лондон, Хитроу</span>
                <span className="card-dir-blue">&nbsp;(LHR)</span>
              </div>
              <hr className="mx-2 my-2" />
              <div className="d-flex flex-row justify-content-between pe-4">
                <div>
                  <span className="me-1 fs-3">20:40</span>
                  <span className="card-dir-blue">18 авг. вт</span>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-clock fs-5"></i>
                  <span className="fs-4">14 ч 45 мин</span>
                </div>
                <div>
                  <span className="card-dir-blue">19 авг. ср</span>
                  <span className="ms-1 fs-3">09:25</span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center mb-1">
                <div className="main-line flex-fill ms-5 me-3" />
                <div className="main-line-title">1 пересадка</div>
                <div className="main-line flex-fill ms-3 me-5" />
              </div>
              <p className="align-self-start m-0 ">
                Рейс выполняет: LOT Polish Airlines
              </p>
            </div>
          </section>
          <button type="button" className="main-card-button">
            ВЫБРАТЬ
          </button>
        </div>
      </div>
    </section>
  );
}
