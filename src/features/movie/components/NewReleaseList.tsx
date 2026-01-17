// src/features/movies/components/NewReleaseList.tsx
import React from 'react';
import { useNewRelase } from '../hooks/useMovie';
import MovieCard from './MovieCard';
import { Loader2 } from 'lucide-react';
import type { IMovie } from '../../../types/movie';

export const NewReleaseList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useNewRelase();

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-red-600" /></div>;
  if (isError) return <div className="text-center p-10 text-red-500">Gagal memuat data.</div>;

  return (
    <section className="py-8 md:px-14 px-4 relative">
      <h2 className="text-white text-xl font-bold mb-6">New Release</h2>

      {/* Grid Layout untuk Movie Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.results.map((movie: IMovie) => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                rating: movie.vote_average,
                posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }}
            />
          ))
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-70 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Tombol Load More */}
      {hasNextPage && (
        <div className="flex justify-center mt-10 absolute left-0 right-0 bottom-25">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-[#1a1a1a] hover:bg-[#252525] text-white px-8 py-3 rounded-full border border-white/10 transition-all font-semibold disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default NewReleaseList;