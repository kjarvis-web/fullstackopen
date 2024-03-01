import express from 'express';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});
const PORT = 3002;
const bmiCalculator = (height, weight) => {
    const result = (weight / height ** 2) * 10000;
    if (result < 18.5) {
        return 'Underweight';
    }
    if (result > 18.5 && result < 24.9) {
        return 'Normal (healthy weight)';
    }
    if (result > 25 && result < 29.9) {
        return 'Overweight';
    }
    return 'You are Obese';
};
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.log(req.query, height, weight);
    res.json({
        height,
        weight,
        bmi: bmiCalculator(height, weight),
    });
});
app.post('/exercises', (req, res) => {
    console.log('request', req.body);
    const { dailyHours, target } = req.body;
    console.log(dailyHours);
    console.log(target);
    if (!dailyHours || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    if (isNaN(dailyHours) || isNaN(target)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    const result = calculateExercises(dailyHours, Number(target));
    return res.send({ result });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
