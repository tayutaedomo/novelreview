const puppeteer = require('puppeteer');

const { NovelReviews } = require('novelreview-lib/lib/novel');
const LINE = require('novelreview-lib/lib/line');

const LINE_POST_USER_ID = process.env['LINE_POST_USER_ID'];


exports.novelreview_scraping = (req, res) => {

  const createLineMessage = (reviews) => {
    const messages = reviews.map(payload => {
      const novel = payload.novel;
      return [
        novel.title,
        [novel.charCount, novel.points, novel.status, novel.genre].join(' / '),
        novel.lastUpdatedAt,
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

      } else {
        console.log('Not send message.');
        console.log(message);
      }

      res.send('OK');

    } catch(err) {
      console.error(err);

      res.status(500);
      res.send('Internal Server Error')
    }

  })();

};
