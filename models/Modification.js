import mongoose from 'mongoose';

const modificationSchema = new mongoose.Schema(
  {
    notes: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    signageRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'SignageRequest', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Modification', modificationSchema);
