import { MOCK_API_BASE, MOCK_API_DATA, createMockFetch } from '../../../src/lib/grading/mockApi.js';

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

// Longest gap between a solution's promise settling and its last timer
// firing (problem 150's report at 400ms). Timer tracking itself is the
// sandbox's job and is covered end-to-end; this only needs the logs.
const SETTLE_MS = 500;
// Synchronous solutions are done as soon as they return; only code that
// can schedule work for later needs the settle wait.
const SCHEDULES_WORK = /setTimeout|setInterval|fetch|Promise/;

// Runs `code` with console.log captured and fetch served by the same mock
// the sandbox uses, then builds the payload shape gradeRun expects. Shared
// by the JavaScript and TypeScript solution tests (the latter runs the
// compiler's emitted JavaScript through it).
export async function runCode(code) {
  const logCalls = [];
  const fakeConsole = {
    log: (...args) => logCalls.push(args.length === 1 ? args[0] : args),
    warn: () => {},
    error: () => {},
    info: () => {}
  };
  const fetch = createMockFetch(MOCK_API_BASE, MOCK_API_DATA, {
    start() {},
    end() {},
    setTimeout
  });

  await new AsyncFunction('console', 'fetch', code)(fakeConsole, fetch);
  if (SCHEDULES_WORK.test(code)) await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));

  // Mirrors the sandbox: Sets are graded as arrays of their values.
  const setsToArrays = (_key, value) => (value instanceof Set ? [...value] : value);
  const serialize = (value) =>
    value === undefined ? undefined : JSON.parse(JSON.stringify(value, setsToArrays));
  return {
    hasLastLogValue: logCalls.length > 0,
    lastLogValue: serialize(logCalls[logCalls.length - 1]),
    allLogValues: logCalls.map(serialize)
  };
}

// sampleData + solution, the way the editor would submit it.
export function solutionCode(exercise) {
  return `${exercise.sampleData}\n\n${exercise.solution}\n`;
}

export function runSolution(exercise) {
  return runCode(solutionCode(exercise));
}
