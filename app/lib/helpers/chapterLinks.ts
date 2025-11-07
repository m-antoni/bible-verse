import { BookChapterAndDetails } from '@/app/types';
import { getFromLocalStorage, storeToLocalStorage } from './localStorage';

// update the link if has intro
export const excludeIntroPage = (url: string, type: string = ''): string => {
  const urlParts = url.split('/').filter(Boolean); //eq. ['read-bible', 'GEN', 'chapter', 'EXO.intro']
  const last = urlParts[3].split('.'); // ['EXO.intro']

  if (type) {
    if (type === 'next' && urlParts[1] !== last[0]) {
      // if the next url has intro store to LS the last chapter url of the current chapter
      if (last[1] === 'intro') {
        const getBookChapterFromLS = getFromLocalStorage<BookChapterAndDetails>('book-chapter');
        const lastNumber: string | undefined =
          getBookChapterFromLS?.details.total_chapter.toString(); // eq. 50
        urlParts[3] = urlParts[1] + '.' + lastNumber;
        const storeToLS = '/' + urlParts.join('/'); // eq. /read-bible/EXO/chapter/EXO.1
        storeToLocalStorage(storeToLS, 'prev-ch');
      }

      // this will modify the url to skip intro when click
      urlParts[1] = last[0]; // replace the book id by the next chapter book id
      urlParts[3] = last[0] + '.' + 1; // replacing intro =>  1

      const storeToLS = '/' + urlParts.join('/'); // eq. /read-bible/EXO/chapter/EXO.1
      return storeToLS;
    }

    if (type === 'prev' && urlParts[1] !== 'GEN' && last[1] === 'intro') {
      // get the last prev chapter url
      const getUrl: string | unknown = getFromLocalStorage<string>('prev-ch');
      if (getUrl) {
        return getUrl as string;
      }
      // fall back in case there is no data on LS
      urlParts[3] = last[0] + '.' + 1; // replacing intro =>  1
      const updatedUrl = '/' + urlParts.join('/'); // eq. /read-bible/EXO/chapter/EXO.1
      return updatedUrl;
    }
  }

  return url;
};

// dropdown chapter navigation
export const dropDownSelectChapter = (urlParts: string[], selected: number): string => {
  const last = urlParts[3].split('.'); // ['EXO.2']
  urlParts[3] = last[0] + '.' + selected; // replacing intro =>  1

  const redirectUrl = '/' + urlParts.join('/');
  // console.log(urlParts, selected);
  return redirectUrl;
};
