/* 
  Next API: /api/bible
  Bible API: https://bible-api/[bibleId]
  Desc: Fetch the bible details base on bible id 
*/
export async function getBible() {
  try {
    const res = await fetch('/api/bible');

    if (!res.ok) {
      // throw new Error(`Failed fetching book details: ${res.statusText}`);
      return { success: false, message: res.statusText, data: null };
    }

    const data = await res.json();

    return { success: true, message: res.statusText, data };
  } catch (error) {
    console.error(`Error fetching book details`, error);
    throw error;
  }
}
