const path = require('path');
const puppeteer = require('puppeteer');

const { NarouReviews } = require('novelreview-lib/lib/novel');
const LINE = require('novelreview-lib/lib/line');

const { PubSub } = require('@google-cloud/pubsub');
let pubSubClient = null;
if (process.env['PUBSUB_CREDENTIALS']) {
  const credentialPath =
    path.join(__dirname, 'etc', 'google-cloud', process.env['PUBSUB_CREDENTIALS']);

  pubSubClient = new PubSub({
    keyFilename: credentialPath
  });
}


const LINE_POST_USER_ID = process.env['LINE_POST_USER_ID'];
const PUBSUB_TOPIC = process.env['PUBSUB_TOPIC'];
const DETECT_OPTIONS = process.env['DETECT_OPTIONS'] || '{}';
const SCRAPING_INTERVAL = process.env['SCRAPING_INTERVAL'];


exports.novelreview_scraping_narou = (req, res) => {
  (async () => {

    try {
      const result = await scraping(SCRAPING_INTERVAL);
      await postMessage(result.detected);
      await publishMessage(result.reviews);

      res.send('OK');

    } catch(err) {
      console.error(err);

      res.status(500);
      res.send('Internal Server Error')
    }

  })();
};


const scraping = async (interval) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  try {
    const page = await browser.newPage();

    const narouReviews = new NarouReviews();
    const reviews = await narouReviews.scrape(page);
    await narouReviews.novelsScraping(page, interval);

    let options = {};
    try {
      options = JSON.parse(DETECT_OPTIONS);
    } catch (err) {
      console.error(err);
    }

    const detected = narouReviews.detect(options);
    console.log('Detected:', detected.length);

    await browser.close();

    return { reviews, detected };

  } catch(err) {
    console.error(err);

    await browser.close();

    return { reviews: [], detected: [] };
  }
};

const postMessage = async (detected) => {
  const message = createLineMessage(detected);

  if (LINE_POST_USER_ID && message.length > 0) {
    await LINE.postMessage(LINE_POST_USER_ID, message, true);
    console.log('Message posted.');

  } else {
    console.log('Not posted yet.');
    console.log(message);
  }
};

const createLineMessage = (reviews) => {
  const messages = reviews.map(review => {
    const novel = review.novel;

    return [
      novel.title,
      [novel.charCount, novel.points, novel.status, novel.genre].join(' / '),
      novel.lastUpdatedAt,
      novel.getUrl(),
    ].join('\n');
  });

  return messages.join('\n');
};

const publishMessage = async (reviews) => {
  const message = JSON.stringify(reviews);

  if (PUBSUB_TOPIC && reviews.length > 0) {
    const buffer = Buffer.from(message);
    const messageId = await pubSubClient.topic(PUBSUB_TOPIC).publish(buffer);
    console.log(`Message published. ${messageId}`);

  } else {
    console.log('Not published yet.');
    console.log(message);
  }
};
