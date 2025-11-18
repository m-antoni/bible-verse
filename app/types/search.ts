export interface Verse {
  id: string;
  orgId: string;
  bookId: string;
  bibleId: string;
  chapterId: string;
  reference: string;
  text: string;
}

export interface SearchResponseData {
  query: string;
  limit: number;
  offset: number;
  total: number;
  verseCount: number;
  verses: Verse[];
}

export interface SearchResponse {
  success: boolean;
  message: string;
  data: SearchResponseData;
}

// search params
export interface searchQueryType {
  query: string;
  limit: string | number;
  offset: string | number;
}
