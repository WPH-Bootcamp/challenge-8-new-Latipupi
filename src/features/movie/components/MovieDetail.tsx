import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovie';
import { Star, Video } from 'lucide-react';
import Button from '../../../components/button/Button';
import type { IPerson } from '../../../types/person';

export const MovieDetail: React.FC = () => {
  const { id } = useParams(); 
  const { data: movie, isLoading } = useMovieDetail(id || '');

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-10">
      {/* 1. Hero Banner Section */}
      <div 
        className="relative h-[100vh] bg-cover bg-center object-top"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), #000), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
         <div className="md:absolute md:inset-0 md:flex md:items-center md:px-10 md:gap-8 md:mt-20"> 
          <div className="flex items-center gap-6 px-4 pt-20 mb-10">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              className="md:w-64 w-40 rounded-2xl shadow-2xl border border-white/10"
              alt={movie.title}
            />
            <div className="flex flex-col justify-between h-full md:py-0 py-4 gap-4">
            <div className="space-y-4">
              <h1 className="md:text-5xl text-2xl font-bold">{movie.title}</h1>
              <p className="text-gray-400 flex items-center gap-4 ">
                <span className="px-2 py-0.5 rounded flex gap-2 items-center"><img src="/calendar.svg" alt="calendar" /> {movie.release_date}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <div className="gap-4 hidden md:flex">
              <Button variant="primary" className="w-fit px-10" icon={<img src="/play-icon.svg" alt="Play Icon" className="w-5 h-5" />}>
                Watch Trailer
              </Button>
            </div>
              <button className="hidden px-3.5 bg-black  w-14 h-14 rounded-full border border-black hover:bg-black/20 md:flex items-center ">
                <img src="/heart.svg" alt="heart icon" className="w-6 h-6 mx-auto"/>
              </button>
            </div>
            <div className="md:block hidden">
             <div className="flex flex-row gap-4 pt-4">
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl w-40 text-center">
                <Star className="mx-auto text-yellow-500 mb-2" fill="currentColor" />
                <p className="text-xs text-gray-500">Rating</p>
                <p className="font-bold">{movie.vote_average.toFixed(1)}/10</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl w-40 text-center">
                <Video className="mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">Genre</p>
                <p className="font-bold">{movie.genres[0]?.name}</p>
              </div>
            </div>
            </div>
            </div>
          </div>
          
          <div className="space-y-4 px-4 md:hidden block">
            <div className="flex gap-4">
              <Button variant="primary" className="w-fit px-10">Watch Trailer</Button>
              <button className="p-3 bg-white/10  w-14 h-14 rounded-full border border-white/20 hover:bg-white/20">
                <span className="text-xl">♡</span>
              </button>
            </div>
            
            <div className="flex gap-4 pt-4 md:block">
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl w-40 text-center">
                <Star className="mx-auto text-yellow-500 mb-2" fill="currentColor" />
                <p className="text-xs text-gray-500">Rating</p>
                <p className="font-bold">{movie.vote_average.toFixed(1)}/10</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl w-40 text-center">
                <Video className="mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">Genre</p>
                <p className="font-bold">{movie.genres[0]?.name}</p>
              </div>
            </div>
          </div> 
        </div>
      </div>

      {/* 2. Overview Section */}
      <section className="md:px-14 px-6 ">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-400 leading-relaxed max-w-4xl">{movie.overview}</p>
      </section>

      {/* 3. Cast & Crew Section */}
      <section className="md:px-14 px-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {movie.credits.cast.slice(0, 6).map((person: IPerson) => (
            <div key={person.id} className="flex items-center gap-4 bg-[#111] p-3 rounded-xl border border-white/5">
              <img 
                src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : '/placeholder.png'} 
                className="w-14 h-14 rounded-lg object-cover"
                alt={person.name}
              />
              <div>
                <p className="font-bold text-sm">{person.name}</p>
                <p className="text-xs text-gray-500">{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};