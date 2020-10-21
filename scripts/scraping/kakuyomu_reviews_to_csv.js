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

  const novelReviews = new NovelReviews();
  const reviews = await novelReviews.scrape(page);
  console.log(JSON.stringify(reviews, null, 2));

  await browser.close();

})();
