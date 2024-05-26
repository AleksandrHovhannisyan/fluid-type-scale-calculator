import path from 'path';
import fs from 'fs';
import 'dotenv/config';

console.log('Fetching Google Fonts...')

const DESTINATION_FILE = path.resolve('src/lib/data/fonts.json');
const API_KEY = process.env.GOOGLE_FONTS_API_KEY;

if (!API_KEY) {
	throw new Error('GOOGLE_FONTS_API_KEY was not set.');
}

// Don't try-catch so build fails
const response = await (
	await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${API_KEY}`)
).json();
const fonts = response.items.map((font) => font.family);

await fs.writeFile(DESTINATION_FILE, JSON.stringify(fonts), (e) => {
	console.log(e)
});

console.log('Done')