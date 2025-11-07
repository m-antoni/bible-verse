// use to transform text with html content on it to html render nextjs
export const verseToHtml = (html: string): string => {
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
};

// use to transform the copyright text with links
export const copyrightToHtml = (text: string): string => {
  if (!text) return '';

  // Detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with <a> tags that open in new tab
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`,
  );
};

// generate random words at the intro page
export const getRandomIntroText = (): string => {
  const introTexts: string[] = [
    'Welcome to this book. May your heart be open and your spirit guided as you read. Let these words inspire faith, hope, and wisdom in your journey.',
    'Blessed are those who seek understanding. May this chapter prepare your soul and strengthen your walk with the Lord.',
    'Welcome! May this book be a light to your path, a source of encouragement, and a reminder of God’s everlasting love.',
    'Step into these pages with faith. Let the words uplift you, teach you, and bring peace to your heart.',
    'Welcome to this chapter. May the Lord guide your thoughts, fill you with wisdom, and inspire you to live in love and truth.',
    'Begin with an open heart and a willing spirit. May this chapter inspire courage, hope, and devotion in your journey.',
    'As you read, may these words illuminate your mind and strengthen your faith in every step you take.',
    'Intro: Let this chapter remind you of God’s mercy, grace, and guidance in all that you do.',
    'May these pages encourage reflection, wisdom, and a deeper connection with the divine.',
    'Welcome! Take a moment to breathe, reflect, and let the Lord’s teachings enrich your soul.',
  ];
  const index = Math.floor(Math.random() * introTexts.length);
  return introTexts[index];
};
