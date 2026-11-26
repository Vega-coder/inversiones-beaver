import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { HiArrowLongRight, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useCases } from '@/infrastructure/container.js';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';

export default function ServicesCatalog() {
  const { categorySlug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState({ categories: [], activeCategory: null, solutions: [] });

  useEffect(() => {
    let active = true;
    useCases.browseSolutions({ categorySlug, query }).then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, [categorySlug, query]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const title = data.activeCategory ? data.activeCategory.title : 'Catálogo de Carpintería en Madera';
  const subtitle = data.activeCategory
    ? data.activeCategory.description
    : 'Explora nuestras soluciones en closets, puertas, cocinas integrales, muebles de baño y mobiliario arquitectónico.';

  return (
    <div className="container-luxe py-10 sm:py-16">
      <SectionHeading eyebrow="Inversiones Beaver & Asociados S.A.S." title={title} subtitle={subtitle} />

      {/* Filtros horizontales desplazables en móvil + buscador */}
      <div className="mb-8 flex flex-col gap-4 border-y border-ink/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap">
          <Link
            to="/servicios"
            className={`shrink-0 rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              !categorySlug
                ? 'border-mahogany bg-ink text-cream-light'
                : 'border-ink/15 bg-white text-ink/75 hover:border-mahogany'
            }`}
          >
            Todos
          </Link>
          {data.categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/servicios/${cat.slug}`}
              className={`shrink-0 rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                categorySlug === cat.slug
                  ? 'border-mahogany bg-ink text-cream-light'
                  : 'border-ink/15 bg-white text-ink/75 hover:border-mahogany'
              }`}
            >
              {cat.shortTitle}
            </Link>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Buscar material, herraje o tipo..."
            className="input py-2.5 pr-10 text-xs"
            aria-label="Buscar soluciones en madera"
          />
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
        </div>
      </div>

      {data.solutions.length === 0 ? (
        <div className="rounded-sm border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="text-sm text-taupe">No encontramos proyectos que coincidan con tu búsqueda.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSearchParams({});
            }}
            className="btn-dark mt-4 text-[10px]"
          >
            Limpiar filtro
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.solutions.map((item) => (
            <Link
              key={item.id}
              to={`/proyecto/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-mahogany/40"
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream sm:aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="eyebrow text-[10px] text-mahogany">{item.categoryLabel}</p>
                <h2 className="mt-2 font-display text-xl font-medium text-ink group-hover:text-mahogany">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.materials.slice(0, 2).map((mat) => (
                    <span
                      key={mat}
                      className="border border-ink/10 bg-cream-light px-2.5 py-1 text-[10px] font-medium text-ink/80"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                  Ver especificaciones <HiArrowLongRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
