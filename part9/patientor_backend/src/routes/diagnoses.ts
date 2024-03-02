import express from 'express';
import getDiagnoses from '../services/diagnosesService';
// import diagnosesService from '../services/diagnosesService'
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('post diagnoses');
});

export default router;
