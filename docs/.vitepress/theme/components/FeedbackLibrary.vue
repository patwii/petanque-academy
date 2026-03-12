<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import {
  getAssessmentHistory,
  getGivenFeedbackHistory,
  getReceivedFeedbackHistory,
  getReceivedFeedbackByPerson,
  calculateOverallScore,
  StoredAssessment,
  GivenFeedback,
  ReceivedFeedback,
  FACTOR_EMOJIS,
  Assessment
} from '../assessment';
import { getLabels } from '../assessment/i18n';

const { lang } = useData();
const labels = computed(() => getLabels(lang.value));

// Data
const myAssessments = ref<StoredAssessment[]>([]);
const givenFeedback = ref<GivenFeedback[]>([]);
const receivedFeedback = ref<ReceivedFeedback[]>([]);
const receivedByPerson = ref<Record<string, ReceivedFeedback[]>>({});

// Active tab
const activeTab = ref<'progress' | 'given' | 'received'>('progress');

// Selected items for detail view
const selectedReceived = ref<ReceivedFeedback | null>(null);
const selectedGiven = ref<GivenFeedback | null>(null);

onMounted(() => {
  loadData();
});

function loadData() {
  myAssessments.value = getAssessmentHistory();
  givenFeedback.value = getGivenFeedbackHistory();
  receivedFeedback.value = getReceivedFeedbackHistory();
  receivedByPerson.value = getReceivedFeedbackByPerson();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(lang.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getScoreDiff(current: Assessment, previous: Assessment): number {
  return calculateOverallScore(current) - calculateOverallScore(previous);
}

function getFactorDiff(self: number, peer: number): { diff: number; class: string } {
  const diff = self - peer;
  return {
    diff,
    class: Math.abs(diff) > 20 ? 'blind-spot' : (diff > 0 ? 'over' : diff < 0 ? 'under' : '')
  };
}

// Unique people who gave feedback
const feedbackGivers = computed(() => Object.keys(receivedByPerson.value));
</script>

<template>
  <div class="feedback-library">
    <h2>📚 {{ labels.libraryTitle || 'Feedback Library' }}</h2>
    
    <!-- Tab Navigation -->
    <div class="tab-nav">
      <button 
        :class="{ active: activeTab === 'progress' }"
        @click="activeTab = 'progress'"
      >
        📈 {{ labels.myProgress || 'My Progress' }}
        <span class="badge" v-if="myAssessments.length">{{ myAssessments.length }}</span>
      </button>
      <button 
        :class="{ active: activeTab === 'received' }"
        @click="activeTab = 'received'"
      >
        📥 {{ labels.feedbackReceived || 'Feedback Received' }}
        <span class="badge" v-if="receivedFeedback.length">{{ receivedFeedback.length }}</span>
      </button>
      <button 
        :class="{ active: activeTab === 'given' }"
        @click="activeTab = 'given'"
      >
        📤 {{ labels.feedbackGiven || 'Feedback Given' }}
        <span class="badge" v-if="givenFeedback.length">{{ givenFeedback.length }}</span>
      </button>
    </div>

    <!-- MY PROGRESS TAB -->
    <div v-if="activeTab === 'progress'" class="tab-content">
      <div v-if="myAssessments.length === 0" class="empty-state">
        <p>{{ labels.noAssessments || 'No assessments yet. Complete your first assessment to start tracking progress.' }}</p>
      </div>
      
      <div v-else class="assessment-list">
        <div 
          v-for="(assessment, index) in myAssessments" 
          :key="assessment.id"
          class="assessment-card"
        >
          <div class="card-header">
            <span class="date">{{ formatDate(assessment.date) }}</span>
            <span class="score">{{ calculateOverallScore(assessment.assessment) }}%</span>
          </div>
          <div class="card-body">
            <div class="factor-mini" v-for="(value, key) in assessment.assessment" :key="key">
              <span class="emoji">{{ FACTOR_EMOJIS[key as keyof Assessment] }}</span>
              <span class="value">{{ value }}%</span>
            </div>
          </div>
          <div v-if="index < myAssessments.length - 1" class="change-indicator">
            <span :class="getScoreDiff(assessment.assessment, myAssessments[index + 1].assessment) >= 0 ? 'positive' : 'negative'">
              {{ getScoreDiff(assessment.assessment, myAssessments[index + 1].assessment) >= 0 ? '↑' : '↓' }}
              {{ Math.abs(getScoreDiff(assessment.assessment, myAssessments[index + 1].assessment)) }}%
            </span>
            {{ labels.sinceLast || 'since last' }}
          </div>
        </div>
      </div>
    </div>

    <!-- FEEDBACK RECEIVED TAB -->
    <div v-if="activeTab === 'received'" class="tab-content">
      <div v-if="receivedFeedback.length === 0" class="empty-state">
        <p>{{ labels.noReceivedFeedback || 'No feedback received yet. Share your assessment link with teammates to get feedback.' }}</p>
      </div>

      <div v-else>
        <!-- Group by person -->
        <div v-for="(feedbacks, personName) in receivedByPerson" :key="personName" class="person-group">
          <h3 class="person-name">👤 {{ personName }}</h3>
          <div class="feedback-timeline">
            <div
              v-for="fb in feedbacks"
              :key="fb.id"
              class="feedback-card"
              @click="selectedReceived = fb"
            >
              <div class="card-header">
                <span class="date">{{ formatDate(fb.date) }}</span>
              </div>
              <div class="comparison-mini">
                <div class="row header-row">
                  <span></span>
                  <span>{{ labels.selfAssessment || 'Self' }}</span>
                  <span>{{ labels.peerAssessment || 'Peer' }}</span>
                  <span>{{ labels.difference || 'Gap' }}</span>
                </div>
                <div
                  v-for="(value, key) in fb.mySelfAssessment"
                  :key="key"
                  class="row"
                  :class="getFactorDiff(value, fb.theirAssessment[key as keyof Assessment]).class"
                >
                  <span class="emoji">{{ FACTOR_EMOJIS[key as keyof Assessment] }}</span>
                  <span>{{ value }}%</span>
                  <span>{{ fb.theirAssessment[key as keyof Assessment] }}%</span>
                  <span class="diff">{{ getFactorDiff(value, fb.theirAssessment[key as keyof Assessment]).diff > 0 ? '+' : '' }}{{ getFactorDiff(value, fb.theirAssessment[key as keyof Assessment]).diff }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FEEDBACK GIVEN TAB -->
    <div v-if="activeTab === 'given'" class="tab-content">
      <div v-if="givenFeedback.length === 0" class="empty-state">
        <p>{{ labels.noGivenFeedback || 'No feedback given yet. When you assess a teammate, it will appear here.' }}</p>
      </div>

      <div v-else class="feedback-list">
        <div
          v-for="fb in givenFeedback"
          :key="fb.id"
          class="feedback-card"
          @click="selectedGiven = fb"
        >
          <div class="card-header">
            <span class="player-name">👤 {{ fb.playerName }}</span>
            <span class="date">{{ formatDate(fb.date) }}</span>
          </div>
          <div class="comparison-mini">
            <div class="row header-row">
              <span></span>
              <span>{{ labels.theirSelf || 'Their Self' }}</span>
              <span>{{ labels.myRating || 'My Rating' }}</span>
            </div>
            <div
              v-for="(value, key) in fb.theirSelfAssessment"
              :key="key"
              class="row"
            >
              <span class="emoji">{{ FACTOR_EMOJIS[key as keyof Assessment] }}</span>
              <span>{{ value }}%</span>
              <span>{{ fb.myAssessment[key as keyof Assessment] }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-library {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.feedback-library h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
}

/* Tab Navigation */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.5rem;
}

.tab-nav button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-nav button:hover {
  background: var(--vp-c-bg-mute);
}

.tab-nav button.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  font-size: 0.75rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

/* Assessment List */
.assessment-list, .feedback-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.assessment-card, .feedback-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.assessment-card:hover, .feedback-card:hover {
  border-color: var(--vp-c-brand-1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.date {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.score {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.player-name {
  font-weight: 600;
}

/* Factor Mini Grid */
.card-body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.factor-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
}

.factor-mini .emoji {
  font-size: 1rem;
}

.factor-mini .value {
  color: var(--vp-c-text-2);
}

/* Change Indicator */
.change-indicator {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-border);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.change-indicator .positive {
  color: #4caf50;
  font-weight: 600;
}

.change-indicator .negative {
  color: #f44336;
  font-weight: 600;
}

/* Person Group */
.person-group {
  margin-bottom: 1.5rem;
}

.person-name {
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.feedback-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Comparison Mini Table */
.comparison-mini {
  font-size: 0.8rem;
}

.comparison-mini .row {
  display: grid;
  grid-template-columns: 24px 1fr 1fr 50px;
  gap: 0.25rem;
  padding: 0.25rem 0;
  align-items: center;
}

.comparison-mini .header-row {
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-border);
  margin-bottom: 0.25rem;
}

.comparison-mini .diff {
  text-align: right;
}

.comparison-mini .row.blind-spot {
  background: rgba(255, 152, 0, 0.1);
  border-radius: 4px;
}

.comparison-mini .row.blind-spot .diff {
  color: #ff9800;
  font-weight: 600;
}

@media (max-width: 600px) {
  .tab-nav {
    flex-wrap: wrap;
  }

  .tab-nav button {
    flex: 1;
    justify-content: center;
    font-size: 0.85rem;
  }

  .card-body {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

