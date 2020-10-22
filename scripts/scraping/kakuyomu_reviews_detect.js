const puppeteer = require('puppeteer');

const NovelReviews = require('../lib/novel_reviews');


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
  console.log('Review Count:', reviews.length);

  const detected = await novelReviews.detect();
  console.log(JSON.stringify(detected, null, 2));

  await browser.close();

})();
