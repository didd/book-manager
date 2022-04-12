import { Genre } from "../model/genres";
import { genres } from "./genres";
export function loadGenres(): Genre[] {
  return genres.map((genre) => ({ ...genre, subGenres: [...genre.subgenres] }));
}
