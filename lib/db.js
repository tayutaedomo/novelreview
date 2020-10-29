const { instances } = require('gstore-node');

const gstore = instances.get('default'); // This implies that you have set an instance earlier
const Schema = gstore.Schema;


const reviewSchema = new Schema({
  source: { type: String }, // (kakuyomu|narou)

  // Review Info
  reviewId:   { type: String, required: true }, // =key
  reviewerId: { type: String },
  title:      { type: String },
  created:    { type: Date },

  // Novel Info
  novelId:    { type: String },
  novelTitle: { type: String },
  authorId:   { type: String },
  points:     { type: Number },
  charCount:  { type: Number },
  latUpdated: { type: Date },
  status:     { type: String },   // (null|completed)
  flags:      { type: Array },    // String array
  tags:       { type: Array },    // String array
});

const novelReviewModel = gstore.model('NovelReview', reviewSchema)


module.exports = {
  NovelReviewModel: novelReviewModel
};
