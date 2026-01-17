import React from 'react';
import { Star } from 'lucide-react'; 
import type { IMovie } from '../../../types/movie'; 
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: IMovie & { rank?: number }; // Menambahkan properti rank secara lokal
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="flex-none w-40 group cursor-pointer">
      <div className="flex-none w-40 space-y-3 group cursor-pointer">
        {/* 1. Container Gambar */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* 2. Badge Ranking (Hanya muncul jika ada rank) */}
          {movie.rank && (
            <div className="absolute top-2 left-2 w-9 h-9 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold tracking-tighter">
                {movie.rank}
              </span>
            </div>
          )}

          {/* Overlay saat Hover (opsional) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 3. Informasi Film */}
        <div className="px-1 space-y-1">
          <h3 className="text-white font-bold text-sm truncate leading-tight">
            {movie.title}
          </h3>

          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-400 text-xs font-semibold">
              {movie?.rating?.toFixed(1)}/10
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;