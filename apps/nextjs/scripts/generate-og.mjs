#!/usr/bin/env node
// Generate Open Graph + Twitter card images from a single source.
// Usage: node apps/nextjs/scripts/generate-og.mjs <source.png>
// Source recommendation: 1600x900 or larger, the safe area will be cropped to fit each platform.

import { argv, exit } from 'node:process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { access, mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..', '..')

const source = argv[2]
if (!source) {
	console.error('Usage: node generate-og.mjs <source.png>')
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
try {
	sharp = (await import('sharp')).default
} catch (err) {
	console.error('Missing dep. Run: pnpm -F @repo/nextjs add -D sharp')
	console.error(err)
	exit(1)
}

const publicDir = resolve(__dirname, '..', 'public')
await mkdir(publicDir, { recursive: true })

const targets = [
	{ width: 1280, height: 832, file: join(publicDir, 'opengraph-image.png') },
	{ width: 1200, height: 675, file: join(publicDir, 'twitter-image.png') },
]

for (const { width, height, file } of targets) {
	await sharp(sourcePath).resize(width, height, { fit: 'cover', position: 'centre' }).png().toFile(file)
	console.log(`  ${width}x${height}  →  ${file.replace(repoRoot + '\\', '').replace(repoRoot + '/', '')}`)
}

console.log('\nDone.')
