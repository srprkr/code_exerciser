<script>
  import { progress, Progress } from '../stores/progress.js';
  import { KNOWN_FUNCTION_DOC_LINKS, DOC_SITE_NAME, languageData } from '../stores/ui.js';

  const badges = $derived.by(() => {
    $progress; // subscribe so this re-derives on any progress change
    $languageData; // ...and on a language switch, which swaps the whole tag set
    return Progress.getBadges();
  });
</script>

<p class="text-sm mb-2" style="color: var(--color-text-muted);">Click any badge to view its {$DOC_SITE_NAME} documentation.</p>

<div class="achievements-grid">
  {#each badges as achievement (achievement.tag)}
    {@const docUrl = $KNOWN_FUNCTION_DOC_LINKS[achievement.tag]}
    {#if docUrl}
      <a
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`View on ${$DOC_SITE_NAME}`}
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
