const exercises = [
  {
    id: 21,
    title: 'Problem 21',
    question: 'Given an array of temperatures in Celsius, convert them all to Fahrenheit.',
    sampleData: 'const temps = [0, 20, 37, 100, -10];',
    solution: `const fahrenheitTemps = temps.map((temp) => Number(((temp * 9) / 5 + 32).toFixed(2)));`,
    output: [32, 68, 98.6, 212, 14]
  }
];

let currentExerciseIndex = 0;

const exerciseEl = document.querySelector('#exercise-1');
const titleEl = document.querySelector('#exercise-1 .exercise-title');
const questionEl = document.querySelector('#exercise-1 .question');
const sampleDataEl = document.querySelector('#exercise-1 .sample-data');
const solutionEl = document.querySelector('#exercise-1 .solution');
const outputEl = document.querySelector('#exercise-1 .output');
const counterEl = document.querySelector('.carousel-counter');
const buttons = document.querySelectorAll('.carousel-button');

function renderExercise(index) {
  const exercise = exercises[index];

  if (!exercise || !exerciseEl) return;

  if (titleEl) titleEl.textContent = `Problem ${exercise.id}`;
  if (questionEl) questionEl.textContent = exercise.question;
  if (sampleDataEl) sampleDataEl.textContent = exercise.sampleData;
  if (solutionEl) solutionEl.textContent = exercise.solution;
  if (outputEl) outputEl.textContent = JSON.stringify(exercise.output, null, 2);
  if (counterEl) counterEl.textContent = `${index + 1} / ${exercises.length}`;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'next') {
      currentExerciseIndex = (currentExerciseIndex + 1) % exercises.length;
    } else if (action === 'prev') {
      currentExerciseIndex = (currentExerciseIndex - 1 + exercises.length) % exercises.length;
    }

    renderExercise(currentExerciseIndex);
  });
});

renderExercise(currentExerciseIndex);
