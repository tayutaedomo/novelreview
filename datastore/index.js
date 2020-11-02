const path = require('path');

const { Datastore } = require('@google-cloud/datastore');

if (process.env['DATASTORE_CREDENTIALS']) {
  const credentialPath =
    path.join(__dirname, 'etc', 'google-cloud', process.env['DATASTORE_CREDENTIALS']);

  const datastore = new Datastore({
    keyFilename: credentialPath
  });

  const { Gstore, instances } = require('gstore-node');
  const gstore = new Gstore({
    cache: false,
    errorOnEntityNotFound: false,
  });

  instances.set('default', gstore);
  gstore.connect(datastore);
}

const { NovelReviews } = require('novelreview-lib/lib/novel');


exports.novelreview_datastore = (req, res) => {
  (async () => {

    try {
      main(req.body);

      res.send('OK');

    } catch(err) {
      console.error(err);

      res.status(500);
      res.send('Internal Server Error')
    }

  })();
};


const main = async (params) => {
  params = params || {};

  if (! params.message || ! params.message.reviews) {
    console.log('Params are invalid.', JSON.stringify(params));
    return;
  }

  const novelReviews = new NovelReviews();
  await novelReviews.restore(params.message.reviews);
  await novelReviews.saveModels();
};
