import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

async function main() {
	const publicDir = path.resolve(process.cwd(), 'public');
	const appDir = path.resolve(process.cwd(), 'app');
	const inputPath = path.resolve(publicDir, 'logo.png');

	try {
		await fs.access(inputPath);
	} catch {
		console.error(`Logo not found: ${inputPath}`);
		console.error('Place a logo.png file in the public/ folder and try again.');
		process.exit(1);
	}

	const metadata = await sharp(inputPath).metadata();

	if (metadata.width !== metadata.height) {
		console.error(`Incompatible logo image: expected 1:1 aspect ratio but got ${metadata.width}x${metadata.height}`);
		process.exit(1);
	}

	if (metadata.width < 512) {
		console.error(`Incompatible logo image: minimum size is 512x512 but got ${metadata.width}x${metadata.height}`);
		process.exit(1);
	}

	// Resize source to 512x512 if larger
	const source = metadata.width > 512 ? sharp(inputPath).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }) : sharp(inputPath);
	const sourceBuffer = await source.png().toBuffer();

	// Generate favicon PNGs
	const sizes = [16, 32, 48, 180, 192, 512];
	const pngBuffers = new Map();

	for (const size of sizes) {
		const buffer = await sharp(sourceBuffer)
			.resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
			.png()
			.toBuffer();
		pngBuffers.set(size, buffer);
	}

	// Write resized 512x512 as the canonical logo.png
	await fs.writeFile(path.join(publicDir, 'logo.png'), pngBuffers.get(512));

	// Generate SVG wrapper embedding the PNG as base64
	const base64 = pngBuffers.get(512).toString('base64');
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image href="data:image/png;base64,${base64}" width="512" height="512"/>
</svg>`;
	await fs.writeFile(path.join(publicDir, 'logo.svg'), svg);
	console.log('Generated: public/logo.svg');

	// Favicons in public/
	await fs.writeFile(path.join(publicDir, 'favicon-16x16.png'), pngBuffers.get(16));
	await fs.writeFile(path.join(publicDir, 'favicon-32x32.png'), pngBuffers.get(32));
	await fs.writeFile(path.join(publicDir, 'apple-touch-icon.png'), pngBuffers.get(180));
	await fs.writeFile(path.join(publicDir, 'android-chrome-192x192.png'), pngBuffers.get(192));
	await fs.writeFile(path.join(publicDir, 'android-chrome-512x512.png'), pngBuffers.get(512));

	// favicon.ico in both public/ and app/
	const faviconIcoBuffer = await pngToIco([pngBuffers.get(16), pngBuffers.get(32), pngBuffers.get(48)]);
	// await fs.writeFile(path.join(publicDir, 'favicon.ico'), faviconIcoBuffer);
	await fs.mkdir(appDir, { recursive: true });
	await fs.writeFile(path.join(appDir, 'favicon.ico'), faviconIcoBuffer);

	console.log('Favicons generated successfully in:', publicDir, 'and', appDir);
}

main().catch((error) => {
	console.error('Failed to generate favicons:', error);
	process.exit(1);
});
