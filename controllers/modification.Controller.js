import Modification from '../models/Modification.js';

export const createModification = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: { message: 'Unauthorized' } });
    const { notes, signageRequestId } = req.body;
    if (!signageRequestId) return res.status(400).json({ error: { message: 'signageRequestId is required' } });
    if (!Array.isArray(notes) || notes.length === 0) return res.status(400).json({ error: { message: 'notes must be a non-empty array of strings' } });

    // ensure all items are strings
    const normalized = notes.map(n => String(n));

    const modification = new Modification({
      notes: normalized,
      signageRequest: signageRequestId
    });

    await modification.save();

    res.status(201).json(modification);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listModifications = async (req, res, next) => {
  try {
    const items = await Modification.find().populate('email name').populate('signageRequest');
    res.json(items);
  } catch (err) { next(err); }
};

export const getModificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Modification.findById(id).populate('email name').populate('signageRequest');
    if (!item) return res.status(404).json({ error: { message: 'Not found' } });
    res.json(item);
  } catch (err) { next(err); }
};

