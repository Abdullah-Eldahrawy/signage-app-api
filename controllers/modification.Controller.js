import Modification from '../models/Modification.js';


export const createModification = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: { message: 'Unauthorized' } });
    const { notes, signageRequestId } = req.body;
    if (!signageRequestId) return res.status(400).json({ error: { message: 'signageRequestId is required' } });
    if (!Array.isArray(notes) || notes.length === 0) return res.status(400).json({ error: { message: 'notes must be a non-empty array of strings' } });

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

export const getModificationsForSignage = async (req, res, next) => {
  try {
    const { id } = req.params; 
    if (!id) return res.status(400).json({ error: { message: 'signage request id required' } });
  const mods = await Modification.find({ signageRequest: id });
    res.json(mods);
  } catch (err) { next(err); }
};