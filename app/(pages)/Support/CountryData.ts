export interface Country {
    code: string;
    dial: string;
    flag: string;
    name: string;
}

export const countries: Country[] = [
    { code: 'kg', dial: '+996', flag: 'Кыргызстан', name: 'Kyrgyzstan' },
    { code: 'in', dial: '+91', flag: 'Индия', name: 'India' },
    { code: 'ru', dial: '+7', flag: 'Россия', name: 'Russia' },
    { code: 'us', dial: '+1', flag: 'США', name: 'USA' },
    { code: 'kz', dial: '+7', flag: 'Казахстан', name: 'Kazakhstan' },
    { code: 'uz', dial: '+998', flag: 'Узбекистан', name: 'Uzbekistan' },
];