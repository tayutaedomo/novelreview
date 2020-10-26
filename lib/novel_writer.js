const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');


class NovelWriter {
  constructor() {
    this.distDirPath = path.join(__dirname, '..', 'data');
  }

  async writeJsonAll(reviews) {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const filename = `kakuyomu_reviews_${timestamp}.json`;
    const distPath = path.join(this.distDirPath, filename);
    const json = JSON.stringify(reviews, null, 2)

    await fs.writeFile(distPath, json);

    return distPath;
  }

  async writeJsonEach(reviews) {
    const filenames = [];

    for await (const payload of reviews) {
      try {
        if (! payload.review || ! payload.review.url) return;

        const items = payload.review.url.split('/');
        const reviewId = items[items.length - 1];
        const filename = `kakuyomu_review_${reviewId}.json`;
        const distPath = path.join(this.distDirPath, filename);
        const json = JSON.stringify(payload, null, 2)

        await fs.writeFile(distPath, json);

        filenames.push(distPath);
      } catch(e) {
        console.error(e);
      }
    }

    return filenames;
  }
}

module.exports = NovelWriter;
