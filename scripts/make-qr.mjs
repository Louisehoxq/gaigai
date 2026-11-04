#!/usr/bin/env node
// Generates one QR code (SVG) per sample enterprise, plus pilot/qr/index.csv.
// Usage: node scripts/make-qr.mjs https://your-deployed-site.example
// Each code opens /?src=qr&se=<enterprise id>, which counts one scan for that enterprise.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import QRCode from 'qrcode';

const base = process.argv[2];
if (!base || !/^https:\/\//.test(base)) {
  console.error('Usage: node scripts/make-qr.mjs https://your-deployed-site.example');
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src', 'data', 'socialEnterprises.ts'), 'utf8');
const ids = [...src.matchAll(/"id": "([a-z0-9-]+)"/g)].map((m) => m[1]);
const names = [...src.matchAll(/"name": "([^"]+)"/g)].map((m) => m[1]);
mkdirSync(join(root, 'pilot', 'qr'), { recursive: true });

const rows = ['enterprise_id,name,url,file'];
for (let i = 0; i < ids.length; i++) {
  const url = `${base.replace(/\/$/, '')}/?src=qr&se=${ids[i]}`;
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 2 });
  writeFileSync(join(root, 'pilot', 'qr', `${ids[i]}.svg`), svg);
  rows.push(`${ids[i]},"${names[i].replace(/"/g, '""')}",${url},qr/${ids[i]}.svg`);
}
writeFileSync(join(root, 'pilot', 'qr', 'index.csv'), rows.join('\n') + '\n');
console.log(`Wrote ${ids.length} QR codes to pilot/qr/`);
