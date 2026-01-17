import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import type { IMovie } from "../../../types/movie";

const fetchTrendingMovies = async (): Promise<any> => {
    const { data } = await api.get("/trending/movie/day?language=en-US'");

    return data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        rating: item.vote_average,
        posterPath: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    }));
}

export const useTrendingMoives = () => {
    return useQuery({
        queryKey: ['trending'],
        queryFn: fetchTrendingMovies,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

const fetchNewRelease = async ({ pageParam = 1}): Promise<IMovie[]> => {
    const { data } = await api.get("/movie/now_playing?language=en-US&page=" + pageParam); 
     return data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        rating: item.vote_average,
        posterPath: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    }));
}

export const useNewRelase = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'new-release'],
    queryFn: async ({ pageParam = 1 }) => {
      // PENTING: Jangan di-map di sini jika ingin Load More jalan
      const { data } = await api.get(`/movie/now_playing?language=en-US&page=${pageParam}`);
      return data; // Return seluruh object respons TMDB
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // TMDB mengembalikan 'page' dan 'total_pages'
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

const fetchMovieDetail = async (id: string) => {
    const { data } = await api.get(`/movie/${id}?append_to_response=credits`);
    return data;
};

export const useMovieDetail = (id: string) => {
    return useQuery({
        queryKey: ['movies', 'detail', id],
        queryFn: () => fetchMovieDetail(id),
        enabled: !!id, // Hanya jalan jika ID ada
    });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await api.get(`/search/movie?query=${query}&language=en-US`);
      return data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        rating: item.vote_average,
        posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      }));
    },
    enabled: query.length > 2, // Cari hanya jika user mengetik lebih dari 2 huruf
  });
};