export type MediaType =
  | "ANIME"
  | "MOVIE"
  | "TV"
  | "GAME";

export interface Media {
  id: number;

  externalId: string;

  type: MediaType;

  title: string;

  imageUrl: string;

  description: string;

  rating: number;

  genres: string[];

  releaseDate?: string;

  link: string;
}