<script setup lang="ts">
import { computed, ref } from 'vue';
import { Assessment, FACTOR_EMOJIS, saveGivenFeedback } from '../assessment';
import { AssessmentLabels } from '../assessment/i18n';

interface Props {
  selfAssessment: Assessment;
  peerAssessment: Assessment;
  labels: AssessmentLabels;
  resultsUrl?: string;
  isPeerMode?: boolean;
  playerName?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const resultsCopied = ref(false);
const feedbackSaved = ref(false);

async function copyResultsLink() {
  if (!props.resultsUrl) return;
  try {
    await navigator.clipboard.writeText(props.resultsUrl);
    resultsCopied.value = true;
    setTimeout(() => { resultsCopied.value = false; }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
}

function saveFeedback() {
  saveGivenFeedback(
    props.playerName || 'Anonymous',
    props.selfAssessment,
    props.peerAssessment
  );
  feedbackSaved.value = true;
}

const factors: (keyof Assessment)[] = [
  'mentalGame', 'motivation', 'sleep', 'selfAwareness',
  'nutrition', 'teamDynamics', 'tensionManagement', 'technique'
];

interface ComparisonRow {
  factor: keyof Assessment;
  label: string;
  emoji: string;
  self: number;
  peer: number;
  diff: number;
  hasBlindSpot: boolean;
}

const comparisonData = computed<ComparisonRow[]>(() => {
  return factors.map(factor => {
    const self = props.selfAssessment[factor];
    const peer = props.peerAssessment[factor];
    const diff = self - peer;
    return {
      factor,
      label: props.labels[factor],
      emoji: FACTOR_EMOJIS[factor],
      self,
      peer,
      diff,
      hasBlindSpot: Math.abs(diff) > 20
    };
  });
});

const blindSpots = computed(() => {
  return comparisonData.value.filter(row => row.hasBlindSpot);
});
</script>

<template>
  <div class="comparison-overlay" @click.self="emit('close')">
    <div class="comparison-modal">
      <div class="modal-header">
        <h2>📊 {{ labels.comparison }}</h2>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <div class="comparison-table">
        <div class="table-header">
          <span class="col-factor">Factor</span>
          <span class="col-value">{{ labels.selfAssessment }}</span>
          <span class="col-value">{{ labels.peerAssessment }}</span>
          <span class="col-diff">{{ labels.difference }}</span>
        </div>
        
        <div 
          v-for="row in comparisonData" 
          :key="row.factor"
          class="table-row"
          :class="{ 'has-blind-spot': row.hasBlindSpot }"
        >
          <span class="col-factor">
            <span class="emoji">{{ row.emoji }}</span>
            {{ row.label }}
          </span>
          <span class="col-value">{{ row.self }}%</span>
          <span class="col-value">{{ row.peer }}%</span>
          <span class="col-diff" :class="{ positive: row.diff > 0, negative: row.diff < 0 }">
            {{ row.diff > 0 ? '+' : '' }}{{ row.diff }}
          </span>
        </div>
      </div>

      <div v-if="blindSpots.length > 0" class="blind-spot-warning">
        <p>{{ labels.blindSpotWarning }}</p>
        <ul>
          <li v-for="spot in blindSpots" :key="spot.factor">
            <strong>{{ spot.emoji }} {{ spot.label }}:</strong>
            Self: {{ spot.self }}%, Peer: {{ spot.peer }}%
            ({{ spot.diff > 0 ? labels.mayOverestimate : labels.mayUnderestimate }})
          </li>
        </ul>
      </div>

      <!-- Share results back to original player (only in peer mode) -->
      <div v-if="isPeerMode && resultsUrl" class="share-results-section">
        <p class="share-results-title">{{ labels.shareResultsTitle }}</p>
        <p class="share-results-desc">{{ labels.shareResultsDesc }}</p>
        <div class="share-link-input">
          <input type="text" :value="resultsUrl" readonly />
          <button @click="copyResultsLink" class="btn-copy">
            {{ resultsCopied ? labels.linkCopied : labels.copyLink }}
          </button>
        </div>
      </div>

      <div class="modal-footer">
        <!-- Save feedback button (only in peer mode) -->
        <button
          v-if="isPeerMode"
          class="btn-save"
          @click="saveFeedback"
          :disabled="feedbackSaved"
        >
          {{ feedbackSaved ? labels.feedbackSaved : labels.saveFeedback }}
        </button>
        <button class="btn-primary" @click="emit('close')">
          {{ labels.closeComparison }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.comparison-modal {
  background: var(--vp-c-bg);
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 0.25rem;
}

.close-btn:hover {
  color: var(--vp-c-text-1);
}

.comparison-table {
  padding: 1rem 1.5rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 60px 60px 60px;
  gap: 0.5rem;
  padding: 0.75rem 0;
  align-items: center;
}

.table-header {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-border);
}

.table-row {
  border-bottom: 1px solid var(--vp-c-border-soft);
}

.table-row.has-blind-spot {
  background: rgba(255, 193, 7, 0.1);
}

.col-factor {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.col-factor .emoji {
  font-size: 1.1rem;
}

.col-value,
.col-diff {
  text-align: center;
  font-weight: 500;
}

.col-diff.positive {
  color: #f44336;
}

.col-diff.negative {
  color: #4caf50;
}

.blind-spot-warning {
  margin: 1rem 1.5rem;
  padding: 1rem;
  background: rgba(255, 193, 7, 0.15);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 8px;
}

.blind-spot-warning p {
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.blind-spot-warning ul {
  margin: 0;
  padding-left: 1.25rem;
}

.blind-spot-warning li {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.share-results-section {
  margin: 1rem 1.5rem;
  padding: 1rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
}

.share-results-title {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.share-results-desc {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.share-link-input {
  display: flex;
  gap: 0.5rem;
}

.share-link-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.btn-copy {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-copy:hover {
  background: var(--vp-c-brand-2);
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vp-c-border);
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-save {
  padding: 0.75rem 2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-save:hover:not(:disabled) {
  background: #43a047;
}

.btn-save:disabled {
  background: #81c784;
  cursor: default;
}

.btn-primary {
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

@media (max-width: 480px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 50px 50px 50px;
    font-size: 0.85rem;
  }

  .col-factor .emoji {
    display: none;
  }

  .modal-footer {
    flex-direction: column;
  }
}
</style>

