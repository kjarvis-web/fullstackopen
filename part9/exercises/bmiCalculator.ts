const bmiCalculator = (height: number, weight: number) => {
  const result = (weight / height ** 2) * 10000;
  if (result < 18.5) return 'Underweight';
  if (result > 18.5 && result < 24.9) return 'Normal (healthy weight)';
  if (result > 25 && result < 29.9) return 'Overweight';
  if (result > 30) return 'You are Obese';
};

console.log(bmiCalculator(180, 70));
