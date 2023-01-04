export type Genre = {
    id: number;
    name: string;
}

export type ProdCountries = {
    iso_3166_1: string,
    name: string
}
export type Movies = {
    page: number;
    results: MovieElement[];
    total_pages: number;
    total_results: number;
}

export type MovieElement = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[],
}

export type MovieDetail = {
    poster_path?: string;
    title: string;
    overview: string;
    genres: Genre[];
    release_date: string;
    imdb_id: string;
    runtime: number;
    production_countries: ProdCountries[]
}


