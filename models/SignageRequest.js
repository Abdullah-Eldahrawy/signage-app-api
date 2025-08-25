import mongoose from 'mongoose';

const signageRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    installationDate: { type: Date },
    installationAddress: { type: String },
    mountingSurface: { type: String },
    signWidth: { type: Number },
    signHeight: { type: Number },
    displayType: { type: String },
    viewingDistance: { type: String },
    primaryMessage: { type: String },
    secondaryInfo: { type: String },
    colors: { type: String },
    attachments: {
      type: [
        {
          name: { type: String },
          mimeType: { type: String },
          contentBase64: { type: String },
          title: { type: String }
        }
      ],
      default: []
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'Requires Modification'], default: 'pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('SignageRequest', signageRequestSchema);
