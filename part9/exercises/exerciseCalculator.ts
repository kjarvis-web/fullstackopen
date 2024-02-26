type Rating = 'good' | 'ok' | 'bad';

interface Values {
  dailyHours: number[];
  target: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 7) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Target value is not a number');
  }

  const dailyHours = args.slice(3).map((arg) => {
    const hours = Number(arg);
    if (isNaN(hours)) {
      throw new Error('Provided values were not numbers');
    }
    return hours;
  });

  return { target, dailyHours };
};
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

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
