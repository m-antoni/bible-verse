/* eslint-disable @typescript-eslint/no-explicit-any */
// Check if window is available (client-side only)
const isBrowser = () => typeof window !== 'undefined';

// ** Store any value to localStorage
export const storeToLocalStorage = <T>(value: T, key: string): void => {
  if (!isBrowser()) return;

  localStorage.setItem(key, JSON.stringify(value));
};

// ** Retrieve any typed value from localStorage
export const getFromLocalStorage = <T>(key: string): T | null => {
  if (!isBrowser()) return null;

  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

// ** Remove an item from localStorage
export const removeFromLocalStorage = (key: string): void => {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
};

// Search items inside localStorage (specific for bible-books)
export const searchFromLocalStorage = (text: string, key: string): any[] => {
  const items = getFromLocalStorage<any[]>(key);
  if (!items) return [];

  const lowerText = text.toLowerCase();

  if (key === 'bible-books') {
    return items.filter((book) => {
      return (
        (book.name?.toLowerCase().includes(lowerText) ?? false) ||
        (book.nameLong?.toLowerCase().includes(lowerText) ?? false) ||
        (book.chapters?.toString().includes(text) ?? false)
      );
    });
  }

  return [];
};

// ** Clearing all items in the localstorage
export const clearLocalStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.clear();
};
