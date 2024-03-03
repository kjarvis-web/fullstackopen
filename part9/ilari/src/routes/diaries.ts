import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({ date, weather, visibility, comment });
  res.json(addedEntry);
});

export default router;
