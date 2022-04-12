import create from "zustand";
import { loadGenres } from "./lib/service";
import { Book, Genre, SubGenre } from "./model/genres";

const genres: Genre[] = loadGenres();

interface BookManagerState {
  genres: Genre[];
  addSubGenre: (
    genreId: Genre["id"],
    name: SubGenre["name"],
    isDescriptionRequired: boolean
  ) => number | null;
  addBook: (
    genreId: Genre["id"],
    subGenreId: SubGenre["id"],
    book: Book
  ) => void;
}

export const useStore = create<BookManagerState>((set) => ({
  genres,
  addSubGenre: (
    genreId: Genre["id"],
    name: SubGenre["name"],
    isDescriptionRequired: boolean
  ) => {
    let lastSubGenreId: number | null = null;
    set((state) => {
      const lastGenre = state.genres[state.genres.length];
      const lastSubGenre = lastGenre
        ? lastGenre.subGenres[lastGenre.subGenres.length]
        : null;
      lastSubGenreId = lastSubGenre ? lastSubGenre.id + 1 : 1;
      return {
        genres: state.genres.map((genre) => {
          if (genre.id === genreId) {
            return {
              ...genre,
              subGenres: [
                ...genre.subGenres,
                {
                  id: lastSubGenreId ?? 1,
                  name,
                  isDescriptionRequired,
                },
              ],
            };
          }
          return genre;
        }),
      };
    });
    return lastSubGenreId;
  },
  addBook: (genreId: Genre["id"], subGenreId: SubGenre["id"], book: Book) => {
    set((state) => {
      return {
        genres: state.genres.map((genre) => {
          if (genre.id === genreId) {
            return {
              ...genre,
              subGenres: genre.subGenres.map((subGenre) => {
                if (subGenre.id === subGenreId) {
                  return {
                    ...subGenre,
                    books: [...(subGenre.books ?? []), book],
                  };
                }
                return subGenre;
              }),
            };
          }
          return genre;
        }),
      };
    });
  },
}));
