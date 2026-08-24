<script>
  import { dedent } from '../utils/dedent.js';

  let { exercise, solutionVisible = false } = $props();
</script>

<div class="block solution-block mb-0" hidden={!solutionVisible}>
  <details open={solutionVisible}>
    <summary>
      <svg class="icon summary-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
      Solution
    </summary>
    <div class="solution-panel">
      <pre class="solution">{dedent(exercise.solution)}</pre>
      <div class="output-window">
        <strong>Output</strong>
        <pre class="output">{JSON.stringify(exercise.output, null, 2)}</pre>
      </div>
    </div>
  </details>
</div>
