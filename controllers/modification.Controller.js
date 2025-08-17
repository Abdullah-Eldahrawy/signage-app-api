import Modification from '../models/Modification.js';

export const createModification = async (req, res) => {
  try {
    const { text } = req.body;

    const modification = new Modification({
      text
    });

    await modification.save();

    res.status(201).json(modification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
