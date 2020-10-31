const { instances } = require('gstore-node');

const gstore = instances.get('default'); // This implies that you have set an instance earlier
const Schema = gstore.Schema;


const reviewSchema = new Schema({
  source: { type: String }, // (kakuyomu|narou)

  // Review Info
  reviewId:   { type: String, required: true }, // =key
  reviewerId: { type: String },
  title:      { type: String },
  written:    { type: Date },

  // Novel Info
  novelId:    { type: String },
  novelTitle: { type: String },
  authorId:   { type: String },
  genre:      { type: String },
  points:     { type: Number },
  charCount:  { type: Number },
  pageCount:  { type: Number },
  status:     { type: Number },   // 1:completed
  latUpdated: { type: Date },
  flags:      { type: Array },    // String array
  tags:       { type: Array },    // String array

  created:    { type: Date, excludeFromIndexes: true }, // Entity created at
});

const novelReviewModel = gstore.model('NovelReview', reviewSchema)


module.exports = {
  NovelReviewModel: novelReviewModel
};
