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
    stageHistory: {
      type: [
        new mongoose.Schema(
          {
            stage: {
              type: String,
              enum: [
                'Sr. Manager - Channel Development Approval',
                'Sr. Director Consumer Sales Approval',
                'Sr. Manager RDT Approval'
              ],
              default: 'Sr. Manager - Channel Development Approval'
            },
            status: { type: String, enum: ['pending', 'approved', 'rejected', 'Requires Modification'], default: 'pending' },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: null }
          },
          { _id: false }
        )
      ],
      default: () => [{}]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

signageRequestSchema.virtual('currentStage').get(function () {
  if (!this.stageHistory || this.stageHistory.length === 0) return undefined;
  return this.stageHistory[this.stageHistory.length - 1];
});

export default mongoose.model('SignageRequest', signageRequestSchema);
