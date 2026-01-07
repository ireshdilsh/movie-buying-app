export interface Movie {
    _id: string;
    name: string;
    description: string;
    releaseDate: string;
    genre: string;
    director: string;
    price: number;
    bannerURL?: string;
}