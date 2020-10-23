const puppeteer = require('puppeteer');

const NovelReviews = require('../lib/novel_reviews');
const LINE = require('../lib/line');

const LINE_POST_USER_ID = process.env['LINE_POST_USER_ID'];


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
  const detected = await novelReviews.detect();

  await browser.close();

  const message = createLineMessage(detected);

  if (LINE_POST_USER_ID && message.length > 0) {
    await LINE.postMessage(LINE_POST_USER_ID, message, true);
    console.log('Sent message.');
  }
})();


const createLineMessage = (reviews) => {
  const messages = reviews.map(payload => {
    return [
      payload.novel.title,
      payload.novel.genre + ' / ' +  payload.novel.points + ' / ' + payload.novel.charCount,
      payload.novel.getUrl(),
    ].join('\n');
  });

  return messages.join('\n');
};
