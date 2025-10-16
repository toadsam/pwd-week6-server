const { Schema, model, Types } = require('mongoose');

const submissionSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    address: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = model('Submission', submissionSchema);

