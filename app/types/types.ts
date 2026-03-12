interface Movie {
    id: number;
    poster_path: string;
}

interface Category {
    id: number;
    name: string;
    images: string[];
}

interface TMDBResponse {
    results: Movie[];
}