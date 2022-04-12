export interface Genre {
  id: number;
  name: string;
  subGenres: SubGenre[];
}

export interface SubGenre {
  id: number;
  name: string;
  books?: Book[];
  isDescriptionRequired: boolean;
}

export interface Book {
  title: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  datePublished?: Date;
  numberOfPages?: number;
  format: string;
  edition: string;
  editionLanguage: string;
  description: string;
}
