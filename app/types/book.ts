export type Book = {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string; // API
  namelong: string; // DB
  chapters: number;
  chapter_01: string;
};
