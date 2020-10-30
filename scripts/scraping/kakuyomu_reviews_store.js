const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore({
  keyFilename: process.env['DATASTORE_CREDENTIALS']
});

const { Gstore, instances } = require('gstore-node');
const gstore = new Gstore({
  cache: false,
  errorOnEntityNotFound: false,
});

instances.set('default', gstore);
gstore.connect(datastore);


const { NovelReviewModel } = require('../../lib/db');
const { NovelReviews } = require('../../lib/novel_reviews');


(async () => {
  const json_path = process.argv[2];
  if (! json_path) {
    console.log('JSON file path is required.');
    return process.exit(1);
  }

  try {
    const novelReviews = new NovelReviews();
    await novelReviews.restore(json_path);
    //console.log(JSON.stringify(novelReviews, null, 2))

    await novelReviews.saveModels();

  } catch(err) {
    console.error(err);
  }
})();
