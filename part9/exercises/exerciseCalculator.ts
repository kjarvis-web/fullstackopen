type Rating = 'good' | 'ok' | 'bad';

const calculateExercises = (dailyHours: number[], target: number) => {
  const average =
    dailyHours.reduce((acc, curr) => acc + curr, 0) / dailyHours.length;

  const trainingDays = dailyHours.filter((n) => n > 0).length;

  let rating: number;
  let ratingDescription: string;

  if (average > target) {
    rating = 3;
  } else if (average === target) {
    rating = 2;
  } else {
    rating = 1;
  }

  switch (rating) {
    case 1:
      ratingDescription = 'bad';
      break;
    case 2:
      ratingDescription = 'ok';
      break;
    case 3:
      ratingDescription = 'good';
      break;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
