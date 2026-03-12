<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import {
  Assessment,
  DEFAULT_ASSESSMENT,
  FACTOR_WEIGHTS,
  FACTOR_EMOJIS,
  generateRecommendations,
  calculateOverallScore,
  saveAssessment,
  getLatestAssessment,
  saveReceivedFeedback
} from '../assessment';
import { getLabels } from '../assessment/i18n';
import RadarChart from './RadarChart.vue';
import PeerComparison from './PeerComparison.vue';
import HistoryView from './HistoryView.vue';
import FeedbackLibrary from './FeedbackLibrary.vue';

const { lang } = useData();
const labels = computed(() => getLabels(lang.value));

// Assessment state
const assessment = ref<Assessment>({ ...DEFAULT_ASSESSMENT });
const showResults = ref(false);
const saved = ref(false);

// Peer validation state
const isPeerMode = ref(false);
const isResultsMode = ref(false);
const originalAssessment = ref<Assessment | null>(null);
const peerAssessment = ref<Assessment>({ ...DEFAULT_ASSESSMENT });
const showShareLink = ref(false);
const linkCopied = ref(false);
const resultsCopied = ref(false);
const showComparison = ref(false);
const peerSubmitted = ref(false);
const receivedFeedbackSaved = ref(false);

// Player name for peer requests
const playerName = ref('');
const peerPlayerName = ref('');

// Factor order by weight (highest first)
const factorOrder: (keyof Assessment)[] = [
  'mentalGame', 'motivation', 'sleep', 'selfAwareness',
  'nutrition', 'teamDynamics', 'tensionManagement', 'technique'
];

// Computed recommendations
const recommendations = computed(() => {
  return generateRecommendations(assessment.value, lang.value, labels.value);
});

const overallScore = computed(() => {
  return calculateOverallScore(assessment.value);
});

// Generate share URL (includes player name)
const shareUrl = computed(() => {
  if (typeof window === 'undefined') return '';
  const data = {
    assessment: assessment.value,
    name: playerName.value || 'Anonymous'
  };
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/${lang.value}/assessment/?peer=${encoded}`;
});

// Generate results URL (for peer to share back)
const resultsUrl = computed(() => {
  if (typeof window === 'undefined' || !originalAssessment.value) return '';
  const data = {
    self: originalAssessment.value,
    peer: peerAssessment.value,
    name: peerPlayerName.value || 'Anonymous'
  };
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/${lang.value}/assessment/?results=${encoded}`;
});

// Methods
function calculate() {
  showResults.value = true;
}

function reset() {
  assessment.value = { ...DEFAULT_ASSESSMENT };
  showResults.value = false;
  saved.value = false;
  showShareLink.value = false;
  isPeerMode.value = false;
  peerSubmitted.value = false;
}

// History refresh key
const historyKey = ref(0);

function save() {
  saveAssessment(assessment.value);
  saved.value = true;
  historyKey.value++; // Trigger history refresh
  setTimeout(() => { saved.value = false; }, 2000);
}

function getLevelLabel(value: number): string {
  if (value < 20) return labels.value.levelBeginner;
  if (value < 40) return labels.value.levelDeveloping;
  if (value < 60) return labels.value.levelCompetent;
  if (value < 80) return labels.value.levelAdvanced;
  return labels.value.levelWorldClass;
}

function toggleShareLink() {
  showShareLink.value = !showShareLink.value;
}

async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    linkCopied.value = true;
    setTimeout(() => { linkCopied.value = false; }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
}

async function copyResultsLink() {
  try {
    await navigator.clipboard.writeText(resultsUrl.value);
    resultsCopied.value = true;
    setTimeout(() => { resultsCopied.value = false; }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
}

function submitPeerReview() {
  peerSubmitted.value = true;
  showComparison.value = true;
}

// Check for peer mode or results mode on mount
function checkPeerMode() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const peerData = params.get('peer');
    const resultsData = params.get('results');

    // Results mode - viewing comparison sent back from peer
    if (resultsData) {
      try {
        const decoded = JSON.parse(atob(resultsData));
        originalAssessment.value = decoded.self;
        peerAssessment.value = decoded.peer;
        peerPlayerName.value = decoded.name || 'Anonymous';
        isResultsMode.value = true;
        showComparison.value = true;

        // Auto-save received feedback
        saveReceivedFeedback(
          decoded.name || 'Anonymous',
          decoded.self,
          decoded.peer
        );
        receivedFeedbackSaved.value = true;
      } catch (e) {
        console.error('Invalid results data:', e);
      }
    }
    // Peer mode - rating someone else
    else if (peerData) {
      try {
        const decoded = JSON.parse(atob(peerData));
        // Handle both old format (just assessment) and new format (with name)
        if (decoded.assessment) {
          originalAssessment.value = decoded.assessment;
          peerPlayerName.value = decoded.name || 'Anonymous';
        } else {
          originalAssessment.value = decoded;
          peerPlayerName.value = 'Anonymous';
        }
        isPeerMode.value = true;
      } catch (e) {
        console.error('Invalid peer data:', e);
      }
    }
    // Normal mode
    else {
      const prev = getLatestAssessment();
      if (prev) {
        assessment.value = { ...prev };
      }
    }
  }
}

onMounted(() => {
  checkPeerMode();
})
</script>

<template>
  <div class="assessment-container">
    <!-- PEER MODE HEADER -->
    <div class="assessment-header peer-header" v-if="isPeerMode && !peerSubmitted">
      <h2>👥 {{ labels.peerReviewTitle }}</h2>
      <p class="player-name" v-if="peerPlayerName && peerPlayerName !== 'Anonymous'">
        {{ labels.ratingPlayer }}: <strong>{{ peerPlayerName }}</strong>
      </p>
      <p class="subtitle">{{ labels.peerReviewSubtitle }}</p>
      <p class="peer-instructions">{{ labels.peerReviewInstructions }}</p>
    </div>

    <!-- RESULTS MODE HEADER -->
    <div class="assessment-header results-header" v-else-if="isResultsMode">
      <h2>📊 {{ labels.resultsTitle }}</h2>
      <p class="subtitle" v-if="peerPlayerName && peerPlayerName !== 'Anonymous'">
        {{ labels.feedbackFrom }}: <strong>{{ peerPlayerName }}</strong>
      </p>
    </div>

    <!-- NORMAL MODE HEADER -->
    <div class="assessment-header" v-else-if="!isPeerMode && !isResultsMode">
      <h2>🎯 {{ labels.title }}</h2>
      <p class="subtitle">{{ labels.subtitle }}</p>
    </div>

    <!-- PEER MODE FORM -->
    <div class="assessment-form" v-if="isPeerMode && !peerSubmitted">
      <div
        v-for="factor in factorOrder"
        :key="factor"
        class="factor-row"
      >
        <div class="factor-header">
          <span class="factor-emoji">{{ FACTOR_EMOJIS[factor] }}</span>
          <span class="factor-name">{{ labels[factor] }}</span>
        </div>
        <div class="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            v-model.number="peerAssessment[factor]"
            class="factor-slider"
          />
          <div class="slider-labels">
            <span class="slider-value">{{ peerAssessment[factor] }}%</span>
            <span class="slider-level">{{ getLevelLabel(peerAssessment[factor]) }}</span>
          </div>
        </div>
      </div>

      <div class="button-row">
        <button class="btn-primary" @click="submitPeerReview">
          {{ labels.submitPeerReview }}
        </button>
      </div>
    </div>

    <!-- NORMAL ASSESSMENT FORM -->
    <div class="assessment-form" v-else-if="!showResults && !isPeerMode">
      <div
        v-for="factor in factorOrder"
        :key="factor"
        class="factor-row"
      >
        <div class="factor-header">
          <span class="factor-emoji">{{ FACTOR_EMOJIS[factor] }}</span>
          <span class="factor-name">{{ labels[factor] }}</span>
          <span class="factor-weight">({{ FACTOR_WEIGHTS[factor] }}p)</span>
        </div>
        <div class="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            v-model.number="assessment[factor]"
            class="factor-slider"
          />
          <div class="slider-labels">
            <span class="slider-value">{{ assessment[factor] }}%</span>
            <span class="slider-level">{{ getLevelLabel(assessment[factor]) }}</span>
          </div>
        </div>
      </div>

      <div class="button-row">
        <button class="btn-primary" @click="calculate">
          {{ labels.calculateButton }}
        </button>
        <button class="btn-secondary" @click="reset">
          {{ labels.resetButton }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="assessment-results" v-else>
      <!-- Radar Chart -->
      <RadarChart
        :assessment="assessment"
        :labels="labels"
        :size="320"
      />

      <div class="overall-score">
        <span class="score-label">{{ labels.overallScore }}:</span>
        <span class="score-value">{{ overallScore }}%</span>
      </div>

      <!-- Top Recommendation -->
      <div class="top-recommendation" v-if="recommendations.length > 0">
        <h3>{{ labels.topRecommendation }}</h3>
        <div class="recommendation-card featured">
          <div class="rec-header">
            <span class="rec-emoji">{{ recommendations[0].emoji }}</span>
            <span class="rec-name">{{ recommendations[0].factorLabel }}</span>
          </div>
          <div class="rec-stats">
            <div class="stat">
              <span class="stat-label">{{ labels.currentLevel }}</span>
              <span class="stat-value">{{ recommendations[0].currentLevel }}%</span>
            </div>
            <div class="stat">
              <span class="stat-label">{{ labels.roiScore }}</span>
              <span class="stat-value roi">{{ recommendations[0].roiScore }}</span>
            </div>
          </div>
          <a :href="recommendations[0].educationLink" class="rec-link">
            {{ labels.learnMore }} →
          </a>
        </div>
      </div>

      <!-- Other Recommendations -->
      <div class="other-recommendations">
        <h4>{{ labels.otherRecommendations }}</h4>
        <div class="rec-list">
          <div 
            v-for="rec in recommendations.slice(1, 4)" 
            :key="rec.factor"
            class="recommendation-card small"
          >
            <span class="rec-emoji">{{ rec.emoji }}</span>
            <span class="rec-name">{{ rec.factorLabel }}</span>
            <span class="rec-current">{{ rec.currentLevel }}%</span>
            <span class="rec-roi">ROI: {{ rec.roiScore }}</span>
            <a :href="rec.educationLink" class="rec-link-small">→</a>
          </div>
        </div>
      </div>

      <!-- Peer Feedback Section -->
      <div class="peer-feedback-section">
        <button class="btn-peer" @click="toggleShareLink">
          👥 {{ labels.getPeerFeedback }}
        </button>

        <div v-if="showShareLink" class="share-link-box">
          <div class="name-input-row">
            <label>{{ labels.yourName }}:</label>
            <input
              type="text"
              v-model="playerName"
              :placeholder="labels.yourNamePlaceholder"
              class="name-input"
            />
          </div>
          <p>{{ labels.shareLink }}</p>
          <div class="share-link-input">
            <input type="text" :value="shareUrl" readonly />
            <button @click="copyShareLink" class="btn-copy">
              {{ linkCopied ? labels.linkCopied : labels.copyLink }}
            </button>
          </div>
        </div>
      </div>

      <div class="button-row">
        <button class="btn-primary" @click="save" :disabled="saved">
          {{ saved ? labels.savedMessage : labels.saveResults }}
        </button>
        <button class="btn-secondary" @click="reset">
          {{ labels.resetButton }}
        </button>
      </div>

      <!-- History View -->
      <HistoryView :key="historyKey" />

      <!-- Feedback Library -->
      <FeedbackLibrary :key="historyKey" />
    </div>

    <!-- Peer Comparison Modal -->
    <PeerComparison
      v-if="showComparison && originalAssessment"
      :self-assessment="originalAssessment"
      :peer-assessment="peerAssessment"
      :labels="labels"
      :results-url="resultsUrl"
      :is-peer-mode="isPeerMode"
      :player-name="peerPlayerName"
      @close="showComparison = false"
    />
  </div>
</template>

