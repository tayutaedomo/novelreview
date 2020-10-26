const NovelReviews = require('../../lib/novel_reviews');


(async () => {
  const json_path = process.argv[2];
  if (! json_path) {
    console.log('JSON file path is required.');
    return process.exit(1);
  }

  try {
    const novelReviews = new NovelReviews();
    await novelReviews.restore(json_path);
    console.log(JSON.stringify(novelReviews, null, 2))

  } catch(err) {
    console.error(err);
  }
})();
