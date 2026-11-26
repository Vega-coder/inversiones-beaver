import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-luxe py-24 text-center">
      <p className="eyebrow text-mahogany">Error 404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Página no encontrada</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-taupe">
        La ruta solicitada no existe. Vuelve al inicio para explorar nuestras líneas de carpintería en madera.
      </p>
      <Link to="/" className="btn-mahogany mt-8">
        Ir al inicio
      </Link>
    </div>
  );
}
