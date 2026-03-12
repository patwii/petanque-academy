<script setup lang="ts">
import { computed } from 'vue';
import { Assessment, FACTOR_EMOJIS } from '../assessment';

interface Props {
  assessment: Assessment;
  labels: Record<string, string>;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 300
});

// Factor order (clockwise from top)
const factors: (keyof Assessment)[] = [
  'mentalGame', 'motivation', 'sleep', 'selfAwareness',
  'nutrition', 'teamDynamics', 'tensionManagement', 'technique'
];

const center = computed(() => props.size / 2);
const maxRadius = computed(() => (props.size / 2) - 40);

// Calculate point position on the chart
function getPoint(index: number, value: number): { x: number; y: number } {
  const angle = (Math.PI * 2 * index) / factors.length - Math.PI / 2;
  const radius = (value / 100) * maxRadius.value;
  return {
    x: center.value + radius * Math.cos(angle),
    y: center.value + radius * Math.sin(angle)
  };
}

// Generate polygon points for the data
const dataPoints = computed(() => {
  return factors.map((factor, i) => {
    const point = getPoint(i, props.assessment[factor]);
    return `${point.x},${point.y}`;
  }).join(' ');
});

// Generate grid circles
const gridLevels = [25, 50, 75, 100];

function getGridPath(level: number): string {
  const points = factors.map((_, i) => {
    const point = getPoint(i, level);
    return `${point.x},${point.y}`;
  });
  return `M ${points.join(' L ')} Z`;
}

// Generate axis lines
function getAxisEnd(index: number): { x: number; y: number } {
  return getPoint(index, 100);
}

// Label positions (slightly outside the chart)
function getLabelPosition(index: number): { x: number; y: number; anchor: string } {
  const angle = (Math.PI * 2 * index) / factors.length - Math.PI / 2;
  const radius = maxRadius.value + 25;
  const x = center.value + radius * Math.cos(angle);
  const y = center.value + radius * Math.sin(angle);
  
  let anchor = 'middle';
  if (Math.cos(angle) < -0.1) anchor = 'end';
  else if (Math.cos(angle) > 0.1) anchor = 'start';
  
  return { x, y, anchor };
}
</script>

<template>
  <div class="radar-chart-container">
    <svg 
      :width="size" 
      :height="size" 
      :viewBox="`0 0 ${size} ${size}`"
      class="radar-chart"
    >
      <!-- Grid circles -->
      <path 
        v-for="level in gridLevels" 
        :key="level"
        :d="getGridPath(level)"
        class="grid-line"
        :class="{ 'grid-line-50': level === 50 }"
      />
      
      <!-- Axis lines -->
      <line 
        v-for="(factor, i) in factors" 
        :key="'axis-' + factor"
        :x1="center"
        :y1="center"
        :x2="getAxisEnd(i).x"
        :y2="getAxisEnd(i).y"
        class="axis-line"
      />
      
      <!-- Data polygon -->
      <polygon 
        :points="dataPoints"
        class="data-polygon"
      />
      
      <!-- Data points -->
      <circle 
        v-for="(factor, i) in factors" 
        :key="'point-' + factor"
        :cx="getPoint(i, assessment[factor]).x"
        :cy="getPoint(i, assessment[factor]).y"
        r="5"
        class="data-point"
      />
      
      <!-- Labels -->
      <text 
        v-for="(factor, i) in factors" 
        :key="'label-' + factor"
        :x="getLabelPosition(i).x"
        :y="getLabelPosition(i).y"
        :text-anchor="getLabelPosition(i).anchor"
        class="factor-label"
      >
        <tspan>{{ FACTOR_EMOJIS[factor] }}</tspan>
        <tspan :x="getLabelPosition(i).x" dy="14" class="label-text">
          {{ assessment[factor] }}%
        </tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.radar-chart-container {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.radar-chart {
  max-width: 100%;
  height: auto;
}

.grid-line {
  fill: none;
  stroke: var(--vp-c-border);
  stroke-width: 1;
  opacity: 0.5;
}

.grid-line-50 {
  stroke-dasharray: 4 2;
  opacity: 0.8;
}

.axis-line {
  stroke: var(--vp-c-border);
  stroke-width: 1;
  opacity: 0.3;
}

.data-polygon {
  fill: var(--vp-c-brand-1);
  fill-opacity: 0.25;
  stroke: var(--vp-c-brand-1);
  stroke-width: 2;
}

.data-point {
  fill: var(--vp-c-brand-1);
  stroke: var(--vp-c-bg);
  stroke-width: 2;
}

.factor-label {
  font-size: 16px;
  fill: var(--vp-c-text-1);
}

.label-text {
  font-size: 11px;
  fill: var(--vp-c-text-2);
}
</style>

