interface Language {
  id: string;
  name: string;
  nameLocal: string;
  script: string;
  scriptDirection: string;
}

interface Country {
  id: string;
  name: string;
  nameLocal: string;
}

export interface Bible {
  id: string;
  dblId: string;
  relatedDbl: string | null;
  name: string;
  nameLocal: string;
  abbreviation: string;
  abbreviationLocal: string;
  description: string;
  descriptionLocal: string;
  language: Language;
  countries: Country[];
  type: string;
  updatedAt: string;
  copyright: string;
  info: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audioBibles: any[];
}
