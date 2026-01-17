import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchMovies } from '../../features/movie/hooks/useMovie';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debouncing: Tunggu user berhenti mengetik selama 500ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: results, isFetching } = useSearchMovies(debouncedQuery);

  return (
    <div className="relative">
      {/* Input Field sesuai desain */}
      <div className="flex items-center bg-[#1a1a1a]/80 border border-white/10 rounded-full px-4 py-1.5 w-64 focus-within:border-red-600 transition-all">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search Movie"
          className="bg-transparent text-sm text-white outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown Hasil Pencarian */}
      {searchTerm.length > 2 && (
        <div className="absolute top-full mt-2 w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {isFetching ? (
            <div className="p-4 text-xs text-gray-400">Searching...</div>
          ) : results?.length > 0 ? (
            results.slice(0, 5).map((movie: any) => (
              <Link 
                key={movie.id} 
                to={`/movie/${movie.id}`}
                className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                onClick={() => setSearchTerm('')} // Tutup saat diklik
              >
                <img src={movie.posterPath} className="w-8 h-12 object-cover rounded" alt="" />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate">{movie.title}</p>
                  <p className="text-[10px] text-yellow-500 font-bold">⭐ {movie.rating.toFixed(1)}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-xs text-gray-400">No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;