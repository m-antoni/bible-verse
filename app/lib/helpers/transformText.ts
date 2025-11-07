// use to transform text with html content on it to html render nextjs
export function verseToHtml(html: string): string {
  if (!html) return '';

  let out = html;

  // Replace verse number spans and style them
  out = out.replace(
    /<span([^>]*data-number="(\d+)"[^>]*)\s+class="[^"]*"([^>]*)>(\d+)<\/span>/g,
    (_match, beforeAttrs, numStr, afterAttrs, num) =>
      `<span${beforeAttrs}${afterAttrs} class="text-lg font-semibold text-blue-600 px-1">${num}</span>`,
  );

  out = out.replace(
    /<span([^>]*data-number="(\d+)"[^>]*)>(\d+)<\/span>/g,
    (_match, attrs, numStr, num) =>
      `<span${attrs} class="text-lg font-semibold text-blue-600 px-1">${num}</span>`,
  );

  // Remove <p> wrappers
  out = out.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, ' ');

  // Clean up spacing
  out = out.replace(/\s+/g, ' ').trim();

  // Add justified alignment + readable color
  return `<p class="mb-4 leading-relaxed text-justify text-slate-700">${out}</p>`;
}

// use to transform the copyright text with links
export function copyrightToHtml(text: string): string {
  if (!text) return '';

  // Detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with <a> tags that open in new tab
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`,
  );
}
