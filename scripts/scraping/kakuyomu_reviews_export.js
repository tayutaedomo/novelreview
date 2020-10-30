const puppeteer = require('puppeteer');

const { NovelReviews, NovelWriter } = require('../../lib/novel_reviews');


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

  const writer = new NovelWriter();
  const filename = await writer.writeJsonAll(reviews);
  console.log(filename);
  const filenames = await writer.writeJsonEach(reviews);
  console.log(filenames);

  await browser.close();

})();
