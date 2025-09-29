import './not-found.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h1 className="not-found__title">404</h1>
        <div className="not-found__card">
          <p className="not-found__desc">No hemos encontrado esta página.</p>
          <p className="not-found__hint">Usa la barra lateral para ir a un ejercicio.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
