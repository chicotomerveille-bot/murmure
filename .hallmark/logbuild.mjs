import { readFileSync, writeFileSync } from 'node:fs';
const dir = 'D:/le plus top/murmure/site';
const entry = JSON.parse(readFileSync(`${dir}/.hallmark/entry.json`, 'utf8'));
if (!entry.date) entry.date = new Date().toISOString().slice(0, 10);
if (!entry.mode) entry.mode = 'build';
const file = `${dir}/.hallmark/log.json`;
let prev = [];
try { prev = JSON.parse(readFileSync(file, 'utf8')); } catch {}
const next = [entry, ...prev].slice(0, 20);
writeFileSync(file, JSON.stringify(next, null, 2));
console.log(`logged ${entry.shape} in ${entry.theme} at the top of ${file} (${next.length} of 20)`);
