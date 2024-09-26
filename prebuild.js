import path from 'path';
import fs from 'fs';

/* NOTE: Q: Why fetch fonts in a standalone script and not on the server side per request? A: Because:
 * 1. The index page is statically generated for performance.
 * 2. Fonts don't change frequently enough to warrant fetching per request.
 * 3. To avoid DDoS attacks or unexpected billing charges in Google Cloud (even though the Google Fonts API currently has no rate limit). */

const DESTINATION_FILE = path.resolve('src/lib/data/fonts.json');
const API_KEY = process.env.GOOGLE_FONTS_API_KEY;

if (!API_KEY) {
	throw new Error('GOOGLE_FONTS_API_KEY was not set.');
}

process.stdout.write('Fetching Google Fonts...');

// Don't try-catch so build fails
const response = await (
	await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${API_KEY}`)
).json();
const fonts = response.items.map((font) => font.family);

process.stdout.write(' \x1b[32mDone ✅\x1b[0m ');

fs.writeFile(DESTINATION_FILE, JSON.stringify(fonts), (e) => {
	if (e) {
		console.log(e);
	} else {
		console.log(`\x1b[32mWrote to ${DESTINATION_FILE}.\x1b[0m\n`);
	}
});
