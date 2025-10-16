const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    category: { type: String },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Restaurant', restaurantSchema);

