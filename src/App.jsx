import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/presentation/components/layout/Layout.jsx';
import Home from '@/presentation/pages/Home.jsx';

const ServicesCatalog = lazy(() => import('@/presentation/pages/ServicesCatalog.jsx'));
const SolutionDetail = lazy(() => import('@/presentation/pages/SolutionDetail.jsx'));
const NotFound = lazy(() => import('@/presentation/pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="py-24 text-center text-sm text-taupe">Cargando...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<ServicesCatalog />} />
            <Route path="servicios/:categorySlug" element={<ServicesCatalog />} />
            <Route path="proyecto/:slug" element={<SolutionDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
