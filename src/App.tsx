import { Routes, Route } from 'react-router-dom';
import { ContentStoreProvider } from '@/contexts/ContentStoreContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Solutions from '@/pages/Solutions';
import Team from '@/pages/Team';
import TeamDetail from '@/pages/TeamDetail';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import ProductDetail from '@/pages/ProductDetail';
import './App.css';

export default function App() {
  return (
    <ContentStoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<TeamDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ContentStoreProvider>
  );
}
