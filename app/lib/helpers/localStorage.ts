/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@/app/types';

// store book's chapter to localstorage
export const storeToLocalStorage = <T>(item: T, itemName: string): void => {
  if (typeof window === 'undefined') return; // guard for server
  localStorage.setItem(itemName, JSON.stringify(item));
};

// get item from localstorage
export const getFromLocalStorage = <T>(itemName: string): T | null => {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(itemName);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

// search query through the localstorage
export const searchFromLocalStorage = (text: string, lsName: string): any[] => {
  const items = getFromLocalStorage<any[]>(lsName);
  if (!items) return [];

  if (lsName === 'bible-books') {
    return items.filter((book: any) => {
      return (
        (book.name?.toLowerCase().includes(text.toLowerCase()) ?? false) ||
        (book.nameLong?.toLowerCase().includes(text.toLowerCase()) ?? false) ||
        (book.chapters?.toString().includes(text) ?? false)
      );
    });
  }

  return [];
};

// remove single item in localstorage
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

// removing all items in localstorage
export const clearLocalStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.clear();
};
