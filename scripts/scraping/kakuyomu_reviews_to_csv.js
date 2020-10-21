const NovelReviews = require('../lib/novel_reviews');

const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();

  novelReviews = new NovelReviews();
  await novelReviews.scrape(page);

  await browser.close();

})();
