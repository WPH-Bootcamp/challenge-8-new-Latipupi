// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MovieDetail } from './features/movie/components/MovieDetail';



function App() {
  return (
      <Router>
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<HomePage />} />
          
          {/* Halaman Detail (menggunakan parameter :id) */}
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
  );
}

export default App;