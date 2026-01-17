import React, { useRef } from 'react';
import { useTrendingMoives } from '../hooks/useMovie';
import MovieCard from './MovieCard';
import { ChevronRight, Loader2 } from 'lucide-react';
import type { IMovie } from '../../../types/movie';

export const TrendingList: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data: movies, isLoading, isError } = useTrendingMoives();

    console.log(movies, "data new trending");

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    }

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-red-600" /></div>;

    if (isError) return <div className="text-center p-10 text-red-500">Gagal memuat data.</div>;

    return (
        <section className="py-6 relative group md:pl-8">
            <h2 className="text-white text-xl font-bold px-6 mb-4">Trending Now</h2>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto px-6 no-scrollbar scroll-smooth md:pl-6"
            >
                {
                    movies?.map((movie : IMovie, index: number) => (
                        <MovieCard
                            key={movie.id}
                            movie={{ ...movie, rank: index + 1 }}
                        />
                    ))
                }
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none"></div>
            <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center 
               transition-all border border-white/10 backdrop-blur-sm
               md:opacity-0 md:group-hover:opacity-100"
            >
                <ChevronRight className="text-white" />
            </button>
        </section>
    )
}