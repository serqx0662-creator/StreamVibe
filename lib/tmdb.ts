const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMoviesByCategory = async (genreId: number) => {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US`
    );
    const data = await res.json();
    // Возвращаем только 4 первых постера для сетки 2x2
    return data.results.slice(0, 4).map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);
};