// Local Storage utilities for Assessment System
import { Assessment, StoredAssessment, StoredData, GivenFeedback, ReceivedFeedback, DEFAULT_ASSESSMENT } from './types';

const STORAGE_KEY = 'petanque-assessment';
const STORAGE_VERSION = '1.0';

/**
 * Generate a unique ID for assessments
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Get stored data from localStorage
 */
export function getStoredData(): StoredData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const parsed = JSON.parse(data) as StoredData;
    if (parsed.version !== STORAGE_VERSION) {
      // Handle migration if needed
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save data to localStorage
 */
function saveStoredData(data: StoredData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save assessment data:', e);
  }
}

/**
 * Initialize storage with default data
 */
function initializeStorage(): StoredData {
  const data: StoredData = {
    version: STORAGE_VERSION,
    assessments: [],
    givenFeedback: [],
    receivedFeedback: [],
    preferences: {
      language: 'en'
    }
  };
  saveStoredData(data);
  return data;
}

/**
 * Save a new assessment
 */
export function saveAssessment(assessment: Assessment): StoredAssessment {
  let data = getStoredData();
  if (!data) {
    data = initializeStorage();
  }
  
  const storedAssessment: StoredAssessment = {
    id: generateId(),
    date: new Date().toISOString(),
    assessment
  };
  
  data.assessments.push(storedAssessment);
  saveStoredData(data);
  
  return storedAssessment;
}

/**
 * Get the most recent assessment
 */
export function getLatestAssessment(): Assessment | null {
  const data = getStoredData();
  if (!data || data.assessments.length === 0) return null;
  
  const sorted = [...data.assessments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return sorted[0].assessment;
}

/**
 * Get all assessments for history
 */
export function getAssessmentHistory(): StoredAssessment[] {
  const data = getStoredData();
  if (!data) return [];

  return [...data.assessments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Save feedback given to another player
 */
export function saveGivenFeedback(
  playerName: string,
  theirSelfAssessment: Assessment,
  myAssessment: Assessment
): GivenFeedback {
  let data = getStoredData();
  if (!data) {
    data = initializeStorage();
  }

  if (!data.givenFeedback) {
    data.givenFeedback = [];
  }

  const feedback: GivenFeedback = {
    id: generateId(),
    date: new Date().toISOString(),
    playerName,
    theirSelfAssessment,
    myAssessment
  };

  data.givenFeedback.push(feedback);
  saveStoredData(data);

  return feedback;
}

/**
 * Get all feedback given to others
 */
export function getGivenFeedbackHistory(): GivenFeedback[] {
  const data = getStoredData();
  if (!data || !data.givenFeedback) return [];

  return [...data.givenFeedback].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Save feedback received from another player
 */
export function saveReceivedFeedback(
  fromName: string,
  mySelfAssessment: Assessment,
  theirAssessment: Assessment
): ReceivedFeedback {
  let data = getStoredData();
  if (!data) {
    data = initializeStorage();
  }

  if (!data.receivedFeedback) {
    data.receivedFeedback = [];
  }

  const feedback: ReceivedFeedback = {
    id: generateId(),
    date: new Date().toISOString(),
    fromName,
    mySelfAssessment,
    theirAssessment
  };

  data.receivedFeedback.push(feedback);
  saveStoredData(data);

  return feedback;
}

/**
 * Get all feedback received from others
 */
export function getReceivedFeedbackHistory(): ReceivedFeedback[] {
  const data = getStoredData();
  if (!data || !data.receivedFeedback) return [];

  return [...data.receivedFeedback].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get feedback grouped by person (for tracking progress from same person)
 */
export function getReceivedFeedbackByPerson(): Record<string, ReceivedFeedback[]> {
  const feedback = getReceivedFeedbackHistory();
  const grouped: Record<string, ReceivedFeedback[]> = {};

  for (const fb of feedback) {
    const name = fb.fromName || 'Anonymous';
    if (!grouped[name]) {
      grouped[name] = [];
    }
    grouped[name].push(fb);
  }

  return grouped;
}

/**
 * Export all data as JSON
 */
export function exportData(): string {
  const data = getStoredData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from JSON
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as StoredData;
    if (data.version && data.assessments) {
      saveStoredData(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Clear all stored data
 */
export function clearData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Generate shareable URL with assessment data
 */
export function generateShareUrl(assessment: Assessment, baseUrl: string): string {
  const encoded = btoa(JSON.stringify(assessment));
  return `${baseUrl}?data=${encoded}`;
}

/**
 * Parse assessment from URL
 */
export function parseShareUrl(url: string): Assessment | null {
  try {
    const params = new URLSearchParams(new URL(url).search);
    const data = params.get('data');
    if (!data) return null;
    return JSON.parse(atob(data)) as Assessment;
  } catch {
    return null;
  }
}

