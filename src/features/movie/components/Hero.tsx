import React from 'react';
import type { IHero } from '../../../types/hero';
import Button from '../../../components/button/Button';

interface HeroProps {
  hero: IHero;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {

  return (
    <div 
      className="relative  md:h-[100vh] h-[85vh] w-full flex flex-col justify-end bg-cover bg-center transition-all duration-500"
     
    >
      <img 
    src={hero.backdropPath} 
    alt={hero.title}
    className="absolute inset-0 w-full h-full object-cover"
  />
      {/* 1. Overlay Gradient Terpisah (Bottom-to-Top) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* 2. Content Wrapper dengan z-10 agar berada di atas gradient */}
      <div className="relative z-10 px-6 md:px-12 pb-16 max-w-2xl space-y-4">
        
        {/* Judul lebih besar di desktop */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          {hero.title}
        </h1>
        
        {/* Deskripsi dengan limit baris agar tidak kepanjangan */}
        <p className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-none leading-relaxed">
          {hero.description}
        </p>
        
        {/* 3. Arah Tombol diubah ke row (jejer samping) */}
        <div className="flex md:flex-row flex-col items-center gap-4 pt-4">
          <Button 
            variant="primary" 
            onClick={() => console.log('Watch Trailer')}
            // Tambahkan efek active:scale pada komponen Button Anda jika belum ada
            icon={<img src="/play-icon.svg" alt="Play Icon" className="w-5 h-5" />}
          >
            Watch Trailer
          </Button>

          <Button 
            variant="secondary"
            onClick={() => console.log('Detail Clicked')}
            className="bg-gray-500/20 backdrop-blur-md hover:bg-gray-500/40 border-none"
          >
            See Detail
          </Button>
        </div>
      </div>
    </div>
  );
};