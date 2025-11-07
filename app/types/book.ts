export type Book = {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
  // added fields
  chapters?: number;
  chapter_01?: string;
};
