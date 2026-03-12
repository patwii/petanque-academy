// Assessment System Types

export interface FactorDefinition {
  id: string;
  weight: number;
  emoji: string;
  educationLink: string;
}

export interface Assessment {
  mentalGame: number;      // 0-100
  motivation: number;      // 0-100
  sleep: number;           // 0-100
  selfAwareness: number;   // 0-100
  nutrition: number;       // 0-100
  teamDynamics: number;    // 0-100
  tensionManagement: number; // 0-100
  technique: number;       // 0-100
}

export interface Recommendation {
  factor: keyof Assessment;
  factorLabel: string;
  emoji: string;
  roiScore: number;
  currentLevel: number;
  weight: number;
  potentialGain: number;
  educationLink: string;
}

export interface StoredAssessment {
  id: string;
  date: string;
  assessment: Assessment;
  peerAssessments?: {
    peerId: string;
    assessment: Assessment;
    date: string;
  }[];
}

// Feedback the user has given to others
export interface GivenFeedback {
  id: string;
  date: string;
  playerName: string;
  theirSelfAssessment: Assessment;
  myAssessment: Assessment;
}

// Feedback the user has received from others
export interface ReceivedFeedback {
  id: string;
  date: string;
  fromName: string;
  mySelfAssessment: Assessment;
  theirAssessment: Assessment;
}

export interface StoredData {
  version: string;
  assessments: StoredAssessment[];
  givenFeedback?: GivenFeedback[];
  receivedFeedback?: ReceivedFeedback[];
  preferences: {
    language: string;
  };
}

export const FACTOR_WEIGHTS: Record<keyof Assessment, number> = {
  mentalGame: 600,
  motivation: 500,
  sleep: 400,
  selfAwareness: 400,
  nutrition: 300,
  teamDynamics: 300,
  tensionManagement: 300,
  technique: 100
};

export const FACTOR_EMOJIS: Record<keyof Assessment, string> = {
  mentalGame: '🧠',
  motivation: '🔥',
  sleep: '😴',
  selfAwareness: '🪞',
  nutrition: '🥗',
  teamDynamics: '🤝',
  tensionManagement: '💆',
  technique: '🎯'
};

export const DEFAULT_ASSESSMENT: Assessment = {
  mentalGame: 50,
  motivation: 50,
  sleep: 50,
  selfAwareness: 50,
  nutrition: 50,
  teamDynamics: 50,
  tensionManagement: 50,
  technique: 50
};

