import mongoose from 'mongoose';

const modificationSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Modification', modificationSchema);
