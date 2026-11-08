import puppeteer from 'puppeteer-core';
const exe = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new' });
for (const [w, h] of [[1440, 900], [1920, 1080]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  await page.goto('file:///D:/le%20plus%20top/murmure/site/index.html', { waitUntil: 'networkidle0' });
  const m = await page.evaluate(() => {
    const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), bottom: Math.round(b.bottom + scrollY), left: Math.round(b.left), width: Math.round(b.width) }; };
    return {
      nav: r('.nav'), h1: r('h1'), console: r('.console'),
      s2: r('section[aria-labelledby="travail-titre"]'), h2s2: r('#travail-titre'),
      s3: r('section[aria-labelledby="chemin-titre"]'), band: r('.band'), footer: r('.footer'),
      docH: Math.round(document.documentElement.scrollHeight),
    };
  });
  console.log(`--- ${w}x${h}`);
  console.log(JSON.stringify(m, null, 1));
  const first = m.h1.top - m.nav.bottom;
  const second = m.s2.top - m.console.bottom;
  console.log(`gap nav->content(first): ${first}px | gap console->s2(second): ${second}px | ratio second/first: ${(second / first).toFixed(2)}`);
  console.log(`console height: ${m.console.bottom - m.console.top}px = ${((m.console.bottom - m.console.top) / h * 100).toFixed(0)}% of viewport`);
  console.log(`s2 head y: ${m.h2s2.top} (fold ${h})`);
  await page.screenshot({ path: `D:/le plus top/murmure/site/.hallmark/shots/check-${w}.png` });
  await page.close();
}
await browser.close();
