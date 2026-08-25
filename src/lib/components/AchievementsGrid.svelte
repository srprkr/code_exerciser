<script>
  import { KNOWN_FUNCTION_MDN_LINKS } from '../data/exercises.js';
  import { progress, Progress } from '../stores/progress.js';

  const badges = $derived.by(() => {
    $progress; // subscribe so this re-derives on any progress change
    return Progress.getBadges();
  });
</script>

<div class="achievements-grid">
  {#each badges as achievement (achievement.tag)}
    {@const mdnUrl = KNOWN_FUNCTION_MDN_LINKS[achievement.tag]}
    {#if mdnUrl}
      <a
        href={mdnUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="View on MDN"
        class="achievement-card"
        class:achievement-card-earned={achievement.earned}
      >
        <span class="achievement-card-label">{achievement.tag}</span>
        <span class="achievement-card-status">
          {achievement.earned ? 'Mastered' : `${achievement.completedCount} / ${achievement.total}`}
        </span>
      </a>
    {:else}
      <div class="achievement-card" class:achievement-card-earned={achievement.earned}>
        <span class="achievement-card-label">{achievement.tag}</span>
        <span class="achievement-card-status">
          {achievement.earned ? 'Mastered' : `${achievement.completedCount} / ${achievement.total}`}
        </span>
      </div>
    {/if}
  {/each}
</div>
