// src/pages/HomePage.tsx
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Hero } from '../features/movie/components/Hero';
import { TrendingList } from '../features/movie/components/TrendingList';
import { NewReleaseList } from '../features/movie/components/NewReleaseList';
import Footer from '../components/footer/Footer';

export const HomePage: React.FC = () => {
  const dummyMovie = {
    id: 1,
    title: "The Gorge",
    description: "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.",
    backdropPath: "/hero.svg",
    posterPath: "/hero.svg"
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero hero={dummyMovie} />
      
      {/* Section Trending Now */}
      <TrendingList />
      <NewReleaseList />
    <Footer />
    </div>
  );
};