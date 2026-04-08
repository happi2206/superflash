const express = require('express');
const Card = require('../models/Card');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { question, answer, category, difficulty } = req.body;

    const card = await Card.create({ question, answer, category, difficulty });

    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Unable to create card' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch cards' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category, difficulty } = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { question, answer, category, difficulty },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Unable to update card' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to delete card' });
  }
});

module.exports = router;