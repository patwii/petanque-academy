<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import {
  StoredAssessment,
  getAssessmentHistory,
  calculateOverallScore,
  FACTOR_EMOJIS,
  Assessment
} from '../assessment';
import { getLabels } from '../assessment/i18n';

const emit = defineEmits<{
  (e: 'load-assessment', assessment: Assessment): void
}>();

const { lang } = useData();
const labels = computed(() => getLabels(lang.value));

const history = ref<StoredAssessment[]>([]);
const showAll = ref(false);
const selectedItems = ref<string[]>([]);
const copiedId = ref<string | null>(null);

// Load history on mount
onMounted(() => {
  history.value = getAssessmentHistory();
});

// Load a historical assessment into the form
function loadAssessment(item: StoredAssessment) {
  emit('load-assessment', item.assessment);
}

// Generate share URL for a specific assessment (view only)
function getShareUrl(item: StoredAssessment): string {
  if (typeof window === 'undefined') return '';
  const data = {
    assessment: item.assessment,
    date: item.date
  };
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/${lang.value}/assessment/?view=${encoded}`;
}

// Generate peer feedback request URL for a specific assessment
function getPeerFeedbackUrl(item: StoredAssessment, playerName: string): string {
  if (typeof window === 'undefined') return '';
  const data = {
    assessment: item.assessment,
    name: playerName || 'Anonymous',
    date: item.date
  };
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/${lang.value}/assessment/?peer=${encoded}`;
}

// Copy share link
async function copyShareLink(item: StoredAssessment) {
  try {
    await navigator.clipboard.writeText(getShareUrl(item));
    copiedId.value = item.id;
    setTimeout(() => { copiedId.value = null; }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
}

// Request feedback state
const requestingFeedbackId = ref<string | null>(null);
const feedbackPlayerName = ref('');
const feedbackLinkCopied = ref<string | null>(null);

function startRequestFeedback(item: StoredAssessment) {
  requestingFeedbackId.value = item.id;
  feedbackPlayerName.value = '';
}

function cancelRequestFeedback() {
  requestingFeedbackId.value = null;
  feedbackPlayerName.value = '';
}

async function copyFeedbackLink(item: StoredAssessment) {
  try {
    const url = getPeerFeedbackUrl(item, feedbackPlayerName.value);
    await navigator.clipboard.writeText(url);
    feedbackLinkCopied.value = item.id;
    setTimeout(() => {
      feedbackLinkCopied.value = null;
      requestingFeedbackId.value = null;
    }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
}

// Displayed items (limited or all)
const displayedHistory = computed(() => {
  if (showAll.value) return history.value;
  return history.value.slice(0, 5);
});

// Calculate score change between assessments
function getScoreChange(current: StoredAssessment, index: number): number | null {
  if (index >= history.value.length - 1) return null;
  const previous = history.value[index + 1];
  const currentScore = calculateOverallScore(current.assessment);
  const previousScore = calculateOverallScore(previous.assessment);
  return currentScore - previousScore;
}

// Format date
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang.value, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Get change class
function getChangeClass(change: number | null): string {
  if (change === null) return '';
  if (change > 0) return 'positive';
  if (change < 0) return 'negative';
  return 'neutral';
}

// Get change text
function getChangeText(change: number | null): string {
  if (change === null) return '';
  if (change > 0) return `+${change} ${labels.value.historyImproved}`;
  if (change < 0) return `${change} ${labels.value.historyDeclined}`;
  return labels.value.historyNoChange;
}

// Clear all history
function clearHistory() {
  if (confirm(labels.value.clearHistoryConfirm)) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('petanque-assessment');
      history.value = [];
    }
  }
}

// Get mini chart data (last 10 scores)
const chartData = computed(() => {
  const recent = history.value.slice(0, 10).reverse();
  return recent.map(item => calculateOverallScore(item.assessment));
});

// Calculate chart path for SVG sparkline
const chartPath = computed(() => {
  if (chartData.value.length < 2) return '';
  
  const width = 200;
  const height = 40;
  const padding = 4;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  
  const min = Math.min(...chartData.value) - 5;
  const max = Math.max(...chartData.value) + 5;
  const range = max - min || 1;
  
  const points = chartData.value.map((value, i) => {
    const x = padding + (i / (chartData.value.length - 1)) * usableWidth;
    const y = padding + usableHeight - ((value - min) / range) * usableHeight;
    return `${x},${y}`;
  });
  
  return `M ${points.join(' L ')}`;
});
</script>

<template>
  <div class="history-section" v-if="history.length > 0">
    <div class="history-header">
      <h3>📈 {{ labels.historyTitle }}</h3>
    </div>

    <!-- Sparkline Chart -->
    <div class="sparkline-container" v-if="chartData.length >= 2">
      <svg width="200" height="40" class="sparkline">
        <path :d="chartPath" class="sparkline-path" />
      </svg>
      <span class="sparkline-label">{{ labels.historyProgress }}</span>
    </div>

    <!-- History List -->
    <div class="history-list">
      <div
        v-for="(item, index) in displayedHistory"
        :key="item.id"
        class="history-item-wrapper"
      >
        <div class="history-item">
          <div class="history-main">
            <div class="history-date">{{ formatDate(item.date) }}</div>
            <div class="history-score">{{ calculateOverallScore(item.assessment) }}%</div>
            <div
              class="history-change"
              :class="getChangeClass(getScoreChange(item, index))"
            >
              {{ getChangeText(getScoreChange(item, index)) }}
            </div>
          </div>
          <div class="history-actions-row">
            <button
              class="btn-icon"
              @click="loadAssessment(item)"
              :title="labels.loadAssessment || 'Load'"
            >
              📋
            </button>
            <button
              class="btn-icon"
              @click="copyShareLink(item)"
              :title="labels.shareAssessment || 'Share'"
            >
              {{ copiedId === item.id ? '✓' : '🔗' }}
            </button>
            <button
              class="btn-icon"
              @click="startRequestFeedback(item)"
              :title="labels.requestFeedback || 'Request Feedback'"
            >
              👥
            </button>
          </div>
        </div>

        <!-- Feedback Request Form (inline) -->
        <div class="feedback-request-form" v-if="requestingFeedbackId === item.id">
          <div class="feedback-form-content">
            <input
              type="text"
              v-model="feedbackPlayerName"
              :placeholder="labels.yourName || 'Your name (optional)'"
              class="feedback-name-input"
            />
            <div class="feedback-form-buttons">
              <button
                class="btn-small btn-primary"
                @click="copyFeedbackLink(item)"
              >
                {{ feedbackLinkCopied === item.id ? '✓ ' + (labels.linkCopied || 'Copied!') : '📋 ' + (labels.copyFeedbackLink || 'Copy Link') }}
              </button>
              <button
                class="btn-small btn-secondary"
                @click="cancelRequestFeedback"
              >
                {{ labels.cancel || 'Cancel' }}
              </button>
            </div>
          </div>
          <p class="feedback-hint">{{ labels.feedbackHint || 'Share this link with a teammate to get their assessment of you' }}</p>
        </div>
      </div>
    </div>

    <!-- Show More / Less -->
    <div class="history-actions" v-if="history.length > 5">
      <button class="btn-text" @click="showAll = !showAll">
        {{ showAll ? 'Show Less' : labels.historyViewAll }} ({{ history.length }})
      </button>
    </div>

    <!-- Clear History -->
    <div class="history-clear" v-if="history.length > 0">
      <button class="btn-danger-text" @click="clearHistory">
        {{ labels.clearHistory }}
      </button>
    </div>
  </div>

  <!-- Empty State -->
  <div class="history-empty" v-else>
    <p>{{ labels.historyEmpty }}</p>
  </div>
</template>

