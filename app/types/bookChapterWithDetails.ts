import { BookChapter } from './bookChapter';

export type BookChapterAndDetails = {
  data: BookChapter;
  details: {
    id: string;
    bibleId: string;
    abbreviation: string;
    name: string;
    nameLong: string;
    total_chapter: number;
  };
};
