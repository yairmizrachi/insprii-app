#!/usr/bin/env node
// Wrap a source SVG in a BIMI-compliant root and write to apps/nextjs/public/logo-bimi.svg.
// BIMI requirements:
//  - SVG Tiny PS 1.2 profile
//  - baseProfile="tiny-ps"
//  - <title> element
//  - no scripts, external refs, or animation
// Usage: node apps/nextjs/scripts/generate-bimi.mjs <source.svg> "<Brand Title>"
// Notes: this wraps an existing SVG. You still need to manually verify Tiny-PS compliance.
//        See https://bimigroup.org/creating-bimi-svg-logo-files

import { argv, exit } from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile, access } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..', '..')
const outFile = resolve(__dirname, '..', 'public', 'logo-bimi.svg')

const source = argv[2]
const title = argv[3]
if (!source || !title) {
	console.error('Usage: node generate-bimi.mjs <source.svg> "<Brand Title>"')
	exit(1)
}

const sourcePath = resolve(process.cwd(), source)
try {
	await access(sourcePath)
} catch {
	console.error(`Source not found: ${sourcePath}`)
	exit(1)
}

const raw = await readFile(sourcePath, 'utf8')

// Strip XML prolog and existing <svg> opening tag, keep inner content
const innerMatch = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
if (!innerMatch) {
	console.error('Source does not contain a <svg>...</svg> block.')
	exit(1)
}
const inner = innerMatch[1].replace(/<title>[\s\S]*?<\/title>\s*/i, '')

const viewBoxMatch = raw.match(/viewBox="([^"]+)"/i)
const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 512 512'

const bimi = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" version="1.2" baseProfile="tiny-ps">
\t<title>${title}</title>
${inner.trim()}
</svg>
`

await writeFile(outFile, bimi)
console.log(`  BIMI SVG  →  ${outFile.replace(repoRoot + '\\', '').replace(repoRoot + '/', '')}`)
console.log('\nRemember to:')
console.log('  - host this file at https://yourdomain.com/logo-bimi.svg')
console.log('  - obtain a VMC (Verified Mark Certificate) from a CA (recommended for Gmail/Yahoo BIMI display)')
console.log('  - publish DNS TXT: default._bimi.yourdomain.com → "v=BIMI1; l=https://yourdomain.com/logo-bimi.svg; a=<VMC URL>"')
