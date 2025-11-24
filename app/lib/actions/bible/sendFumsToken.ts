/* 
  Report the usage to API.Bible (if token exists)
  API Docs: https://docs.api.bible/guides/fair-use/
  Desc: allowing me to use the API for tracking, function purpose is to send and forget
*/
export async function sendFumsToken(fumsToken: string) {
  if (fumsToken) {
    await fetch(`https://fums.api.bible/f3?t=${fumsToken}`, {
      method: 'GET',
      mode: 'no-cors',
    });
  }
}
