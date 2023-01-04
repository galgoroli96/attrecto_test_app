// type of FilterInput
export type FilterInputProps = {
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
// one item from MoviesList
export type MovieElement = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[]
}
// type of MoviesList
export type Movies = {
    page: number;
    results: MovieElement[];
    total_pages: number;
    total_results: number;
}