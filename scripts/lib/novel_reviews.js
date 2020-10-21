class NovelReviews {
  constructor() {
    this.url = 'https://kakuyomu.jp/recent_reviews';
  }

  async scrape(page) {
    if (! this.url) return null;

    await page.goto(this.url);

    const itemHandles = await page.$$('.widget-reviewsItem');

    const reviews = [];

    for await (const itemHandle of itemHandles) {
      try {
        const titleHandle = await itemHandle.$('.widget-catchphrase-title a');
        if (titleHandle) {
          const title = await titleHandle.evaluate(node => node.innerText);
          const url = await titleHandle.evaluate(node => node.getAttribute('href'));
          console.log(url, title);
        }
      } catch(e) {
        console.log(e);
      }
    }

    return reviews;
  }
}

module.exports = NovelReviews;
