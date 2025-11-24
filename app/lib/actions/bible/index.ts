import { getBible } from './getBible';
import { getBibleBooksDB } from './getBibleBooksDB';
import { getBibleDB } from './getBibleDB';
import { getBookChapter } from './getBookChapter';
import { searchKeyword } from './searchKeyword';

const bibleActions = {
  getBibleBooksDB,
  getBookChapter,
  searchKeyword,
  getBible,
  getBibleDB,
};

export default bibleActions;
