#!/usr/bin/env node
// Generate favicons + PWA icons + Expo app icon from a single source PNG.
// Usage: node apps/nextjs/scripts/generate-favicon.mjs <source.png>
// Source recommendation: square, >= 1024x1024, transparent background.

import { argv, exit } from 'node:process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile, access } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..', '..')

const source = argv[2]
if (!source) {
	console.error('Usage: node generate-favicon.mjs <source.png>')
	exit(1)
}

const sourcePath = resolve(process.cwd(), source)
try {
	await access(sourcePath)
} catch {
	console.error(`Source not found: ${sourcePath}`)
	exit(1)
}

let sharp
let pngToIco
try {
	sharp = (await import('sharp')).default
	pngToIco = (await import('png-to-ico')).default
} catch (err) {
	console.error('Missing deps. Run: pnpm -F @repo/nextjs add -D sharp png-to-ico')
	console.error(err)
	exit(1)
}

const publicDir = resolve(__dirname, '..', 'public')
const expoAssets = join(repoRoot, 'apps', 'expo', 'assets', 'images')

await mkdir(publicDir, { recursive: true })

const targets = [
	{ size: 16, file: join(publicDir, 'favicon-16x16.png') },
	{ size: 32, file: join(publicDir, 'favicon-32x32.png') },
	{ size: 180, file: join(publicDir, 'apple-touch-icon.png') },
	{ size: 192, file: join(publicDir, 'android-chrome-192x192.png') },
	{ size: 512, file: join(publicDir, 'android-chrome-512x512.png') },
	{ size: 1024, file: join(expoAssets, 'app-icon-ios.png') },
	{ size: 1024, file: join(expoAssets, 'app-icon-android-legacy.png') },
	{ size: 1024, file: join(expoAssets, 'app-icon-android-adaptive-foreground.png') },
]

for (const { size, file } of targets) {
	await mkdir(dirname(file), { recursive: true })
	await sharp(sourcePath).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(file)
	console.log(`  ${size}x${size}  →  ${file.replace(repoRoot + '\\', '').replace(repoRoot + '/', '')}`)
}

const ico = await pngToIco([join(publicDir, 'favicon-16x16.png'), join(publicDir, 'favicon-32x32.png')])
await writeFile(join(publicDir, 'favicon.ico'), ico)
console.log(`  favicon.ico   →  apps/nextjs/public/favicon.ico`)
console.log('\nDone.')
