// lib/tmdb.ts

// Временные данные, пока API ключ не заработает
const mockCategories = [
    {
        id: 1,
        name: "Action",
        images: ["/img/bg-image/movies.png", "/img/bg-image/movies2.png", "/img/bg-image/movies3.png", "/img/bg-image/movies4.png"]
    },
    {
        id: 2,
        name: "Adventure",
        images: ["/img/bg-image/movies2.png", "/img/bg-image/movies3.png", "/img/bg-image/movies4.png", "/img/bg-image/movies.png"]
    },
    {
        id: 3,
        name: "Comedy",
        images: ["/img/bg-image/movies3.png", "/img/bg-image/movies4.png", "/img/bg-image/movies.png", "/img/bg-image/movies2.png"]
    },
    {
        id: 4,
        name: "Drama",
        images: ["/img/bg-image/movies4.png", "/img/bg-image/movies.png", "/img/bg-image/movies2.png", "/img/bg-image/movies3.png"]
    },
    {
        id: 5,
        name: "Horror",
        images: ["/img/bg-image/movies.png", "/img/bg-image/movies2.png", "/img/bg-image/movies3.png", "/img/bg-image/movies4.png"]
    }
];

export async function getMovieCategories() {
    // Имитируем задержку сети
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCategories;
}