/*
** EPITECH PROJECT, 2025
** eurozon-deal-finder [WSL: Ubuntu]
** File description:
** amazonDE
*/

const puppeteer = require('puppeteer');

async function scrapeAmazonDE(asin) {
  const url = `https://www.amazon.de/dp/${asin}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(() => {
    const title = document.querySelector('#productTitle')?.innerText?.trim();

    const priceSelectors = [
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '#priceblock_saleprice',
      '#corePrice_feature_div span.a-offscreen',
      '#price_inside_buybox'
    ];

    let price = null;
    for (const selector of priceSelectors) {
      const el = document.querySelector(selector);
      if (el) {
        price = el.innerText.trim();
        break;
      }
    }

    return { title, price };
  });

  await browser.close();
  return { ...result, fraisPortEstime: '5.99€' };
}

module.exports = scrapeAmazonDE;
