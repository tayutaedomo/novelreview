class NovelReviews {
  constructor() {
    this.reviews = [];
  }

  async scrape(page) {
    const url = 'https://kakuyomu.jp/recent_reviews';
    await page.goto(url);

    const itemHandles = await page.$$('.widget-reviewsItem');

    for await (const itemHandle of itemHandles) {
      try {
        const review = new NovelReview();
        await review.parseReviewsItem(itemHandle);

        const novel = new Novel();
        await novel.parseReviewsItem(itemHandle);

        this.reviews.push({ review, novel });
      } catch(e) {
        console.error(e);
      }
    }

    return this.reviews;
  }

  async detect() {
    return this.reviews.filter(payload => payload.novel.detect());
  }
}


class NovelReview {
  constructor() {
    this.url = null;
    this.title = null;
    this.reviewerUrl = null;
    this.createdAt = null;
    this.star = null;
  }

  getData() {
    return {
      url: this.url,
      title: this.title,
      reviewerUrl: this.reviewerUrl,
      createdAt: this.createdAt,
      star: this.star,
    };
  }

  async parseReviewsItem(itemHandle) {
    try {
      const titleHandle = await itemHandle.$('.widget-catchphrase-title a');
      if (titleHandle) {
        this.url = await titleHandle.evaluate(node => node.getAttribute('href'));
        this.title = await titleHandle.evaluate(node => node.innerText);
      }

      const authorHandle = await itemHandle.$('.widget-catchphrase-author a');
      if (authorHandle) {
        this.reviewerUrl = await authorHandle.evaluate(node => node.getAttribute('href'));
      }
    } catch(e) {
      console.error(e);
    }
  }
}


class Novel {
  constructor() {
    this.url = null;
    this.title = null;
    this.writerUrl = null;
    this.points = null;
    this.genre = null;
    this.status = null;
    this.charCount = null;
    this.updated = null;
    this.flags = null;
    this.tags = null;
  }

  getData() {
    return {
      url: this.url,
      title: this.title,
      writerUrl: this.writerUrl,
      points: this.points,
      genre: this.genre,
      status: this.status,
      charCount: this.charCount,
      updated: this.updated,
      flag: sthis.flags,
      tags: this.tags,
    };
  }

  getUrl() {
    if (! this.url) return '';
    return 'https://kakuyomu.jp' + this.url;
  }

  async parseReviewsItem(itemHandle) {
    try {
      const titleHandle = await itemHandle.$('.widget-workCard-title a');
      if (titleHandle) {
        this.url = await titleHandle.evaluate(node => node.getAttribute('href'));
        this.title = await titleHandle.evaluate(node => node.innerText);
      }

      const authorHandle = await itemHandle.$('.widget-workCard-title span.widget-workCard-author a');
      if (authorHandle) {
        this.writerUrl = await authorHandle.evaluate(node => node.getAttribute('href'));
      }

      const pointsHandle = await itemHandle.$('.widget-workCard-reviewPoints');
      if (pointsHandle) {
        this.points = await pointsHandle.evaluate(node => node.innerText);
      }

      const genreHandle = await itemHandle.$('.widget-workCard-genre a');
      if (genreHandle) {
        this.genre = await genreHandle.evaluate(node => node.innerText);
      }

      const statusHandle = await itemHandle.$('.widget-workCard-status');
      if (statusHandle) {
        this.status = await statusHandle.evaluate(node => node.innerText);
      }

      const charCountHandle = await itemHandle.$('.widget-workCard-characterCount');
      if (charCountHandle) {
        this.charCount = await charCountHandle.evaluate(node => node.innerText);
      }

      const updatedHandle = await itemHandle.$('.widget-workCard-dateUpdated');
      if (updatedHandle) {
        this.updated = await updatedHandle.evaluate(node => node.innerText);
      }

      const flagsHandle = await itemHandle.$('.widget-workCard-flags');
      if (flagsHandle) {
        this.flags = await flagsHandle.evaluate(node => {
          return Array.from(node.querySelectorAll('span')).map(node => node.innerText);
        });
      }

      const tagsHandle = await itemHandle.$('.widget-workCard-tags');
      if (tagsHandle) {
        this.tags = await tagsHandle.evaluate(node => {
          return Array.from(node.querySelectorAll('a')).map(node => node.innerText);
        });
      }
    } catch(e) {
      console.error(e);
    }
  }

  detect() {
    if (! this.charCount) return false;

    // Character count check
    if (this.getCharCountInt() < 100000) return false;

    return true;
  }

  getCharCountInt() {
    if (! this.charCount) return 0;

    try {
      return parseInt(this.charCount.replace(/[\D]/g, ''));
    } catch {
      return 0;
    }
  }
}


module.exports = NovelReviews;
