import SignageRequest from '../models/SignageRequest.js';


const STAGE_SEQUENCE = [
  'Sr. Manager - Channel Development Approval',
  'Sr. Director Consumer Sales Approval',
  'Sr. Manager RDT Approval'
];

export const updateStageStatus = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: { message: 'status is required' } });
    if (!['pending','approved','rejected','Requires Modification'].includes(status)) return res.status(400).json({ error: { message: 'invalid status' } });

    const doc = await SignageRequest.findById(id);
    if (!doc) return res.status(404).json({ error: { message: 'Signage request not found' } });

    if (!doc.stageHistory || doc.stageHistory.length === 0) doc.stageHistory = [{}];

    const lastIndex = doc.stageHistory.length - 1;
    const last = doc.stageHistory[lastIndex];

      const now = new Date();
      if (status === 'approved') {
        last.status = 'approved';
        last.updatedAt = now;

        const currentStageName = last.stage || STAGE_SEQUENCE[0];
        const idx = STAGE_SEQUENCE.indexOf(currentStageName);
        const nextStage = (idx >= 0 && idx < STAGE_SEQUENCE.length - 1) ? STAGE_SEQUENCE[idx + 1] : null;
        if (nextStage) {
          doc.stageHistory.push({ stage: nextStage, status: 'pending', createdAt: now });
        }
      } else {
        last.status = status;
        last.updatedAt = now;
      }
      await doc.save();
      res.status(201).end();
  } catch (err) { next(err); }
};

export const getRequestsForUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: { message: 'Unauthorized' } });
    const items = await SignageRequest.find({ user: req.user.id })
    res.json(items);
  } catch (err) { next(err); }
};