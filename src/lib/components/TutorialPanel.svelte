<script>
  import { dedent } from '../utils/dedent.js';
  import { highlightToHtml, renderTutorialMarkdown } from '../utils/highlight.js';
  import { docSiteNameFor } from '../stores/ui.js';

  // Shown in place of the solution toggle/hint for TypeScript's intro
  // problems: explain the concept, show the answer outright, then have the
  // user type it into the editor themselves. The solution block is
  // deliberately unselectable (see .tutorial-solution-code in app.scss) —
  // typing it out is the practice; pasting it would skip that.
  let { exercise } = $props();

  const tutorialHtml = $derived(renderTutorialMarkdown(exercise.tutorial));
  const solutionHtml = $derived(highlightToHtml(dedent(exercise.solution), 'typescript'));
</script>

<div class="block tutorial">
  <h3 class="font-bold mt-4 mb-1">Tutorial:</h3>
  <div class="tutorial-body">
    {@html tutorialHtml}
  </div>

  <div class="tutorial-solution">
    <strong class="tutorial-solution-label">Solution</strong>
    <pre class="tutorial-code tutorial-solution-code"><code>{@html solutionHtml}</code></pre>
    <div class="output-window">
      <strong>Output</strong>
      <pre class="output">{JSON.stringify(exercise.output, null, 2)}</pre>
    </div>
  </div>

  <p class="tutorial-note">
    Now type it out yourself in the editor below. Writing it by hand is the practice.
    {#if exercise.docUrl}
      <a href={exercise.docUrl} target="_blank" rel="noopener noreferrer">Read more on the {$docSiteNameFor(exercise.docUrl)}</a>.
    {/if}
  </p>
</div>
