import { Genre } from "../types";

export function findGenreName(genreId: number) {
    const data = sessionStorage.getItem("genres");
    if (data && genreId) {
        const list = JSON.parse(data);
        return list.find((genre: Genre) => genre.id === genreId).name;
    }
    return "-"
}