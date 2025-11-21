import { Book } from '@/app/types';
import { getFromLocalStorage } from './localStorage';

// ** Update the link for PREV and Next Buttons
export const excludeIntroPage = (url: string, type: string = ''): string => {
  const urlParts = url.split('/').filter(Boolean); //eq. ['read-bible', 'GEN', 'chapter', 'EXO.intro']
  const last = urlParts[3].split('.'); // ['EXO.intro']

  // ** This will modify the url to skip intro when click
  if (type) {
    // ** NEXT Button is clicked
    // ** Decide what is the next chapter to navigate
    if (type === 'next' && urlParts[1] !== last[0]) {
      urlParts[1] = last[0]; // replace the book id by the next chapter book id
      urlParts[3] = last[0] + '.' + 1; // replacing intro =>  1

      const nextChapterURL = '/' + urlParts.join('/'); // eq. /read-bible/LEV/chapter/LEV.1
      return nextChapterURL;
    }

    // ** PREV Button is clicked
    // ** Decide what is the previous chapter to navigate
    if (type === 'prev' && urlParts[1] !== 'GEN' && last[1] === 'intro') {
      // ** Fetch the Previous Book from the localstorage
      const books = getFromLocalStorage<Book[]>('bible-books');
      if (books) {
        const index = books.findIndex((b) => b.id === urlParts[1]);

        if (index <= 0) return url; // If it's the first book OR not found → nothing to return

        const previousBook = books[index - 1];

        urlParts[1] = previousBook.id;

        urlParts[3] = `${previousBook.id}.${previousBook.chapters - 1}`; // EXO.40

        return '/' + urlParts.join('/'); // eq. /read-bible/LEV/chapter/LEV.1
      }

      // ** Otherwise return the previous chapter of the current book
      urlParts[3] = last[0] + '.' + 1; // replacing intro =>  1
      const updatedUrl = '/' + urlParts.join('/'); // eq. /read-bible/LEV/chapter/LEV.1
      return updatedUrl;
    }
  }

  return url;
};

// ** Dropdown Chapter Navigation
export const dropDownSelectChapter = (urlParts: string[], selected: number): string => {
  const last = urlParts[3].split('.'); // ['EXO.2']
  urlParts[3] = last[0] + '.' + selected; // replacing intro =>  1

  const redirectUrl = '/' + urlParts.join('/');
  // console.log(urlParts, selected);
  return redirectUrl;
};
