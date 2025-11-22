-- ============================
-- Seeder: Insert King James Version into bible table
-- with books array
-- ============================

INSERT INTO public.bible (
    bible_id,
    name,
    abbreviation_local,
    language,
    copyright,
    books,
    created_at
) VALUES (
    'de4e12af7f28f599-01', -- primary key
    'King James (Authorised) Version',
    'KJV',
    'English',
    'PUBLIC DOMAIN except in the United Kingdom, where a Crown Copyright applies to printing the KJV. See http://www.cambridge.org/about-us/who-we-are/queens-printers-patent',
    ARRAY[
        'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT',
        '1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH',
        'EST','JOB','PSA','PRO','ECC','SNG','ISA','JER',
        'LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON',
        'MIC','NAM','HAB','ZEP','HAG','ZEC','MAL','1ES',
        '2ES','TOB','JDT','ESG','WIS','SIR','BAR','S3Y',
        'SUS','BEL','MAN','1MA','2MA','MAT','MRK','LUK',
        'JHN','ACT','ROM','1CO','2CO','GAL','EPH','PHP',
        'COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB',
        'JAS','1PE','2PE','1JN','2JN','3JN','JUD','REV'
    ],
    now()
)
ON CONFLICT (bible_id) DO NOTHING; -- idempotent
