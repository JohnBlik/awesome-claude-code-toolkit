// Post-process the vite-plugin-singlefile output:
//  - Inlines the favicon as a data URI (so the file is truly standalone)
//  - Inlines the OG image reference into a data URI placeholder (optional)
//  - Copies the finished file to the project root as `portfolio.html`
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname);
const inputPath = path.join(projectRoot, 'dist-single', 'index.html');
const outputPath = path.join(projectRoot, 'portfolio.html');

const faviconSvg = await readFile(path.join(projectRoot, 'public', 'favicon.svg'), 'utf8');
const faviconDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(faviconSvg)}`;

let html = await readFile(inputPath, 'utf8');

// Replace the favicon reference with a data URI
html = html.replace(/href="\.?\/?favicon\.svg"/g, `href="${faviconDataUri}"`);
// Drop the og:image and canonical href that point to relative paths the file
// won't have access to when opened via file://
html = html.replace(/<meta property="og:image"[^>]*>\s*/g, '');
html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');

await writeFile(outputPath, html);
await copyFile(inputPath, path.join(projectRoot, 'dist-single', 'portfolio.html'));

const bytes = Buffer.byteLength(html, 'utf8');
console.log(`Wrote ${outputPath}`);
console.log(`Size: ${(bytes / 1024).toFixed(1)} KB`);
