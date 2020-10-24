const puppeteer = require('puppeteer');

const NovelReviews = require('./lib/novel_reviews');
const LINE = require('./lib/line');

const LINE_POST_USER_ID = process.env['LINE_POST_USER_ID'];


exports.scraping = (req, res) => {

  const createLineMessage = (reviews) => {
    const messages = reviews.map(payload => {
      const novel = payload.novel;
      return [
        novel.title,
        novel.genre + ' / ' +  novel.points + ' / ' + novel.charCount  + ' / ' + novel.status,
        novel.getUrl(),
      ].join('\n');
    });

    return messages.join('\n');
  };

  (async () => {

    try {
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

      res.send('OK');

    } catch(err) {
      console.error(err);

      res.status(500);
      res.send('Internal Server Error')
    }

  })();

};
