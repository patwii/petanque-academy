// Internationalization for Assessment System

export interface AssessmentLabels {
  // Factor names
  mentalGame: string;
  motivation: string;
  sleep: string;
  selfAwareness: string;
  nutrition: string;
  teamDynamics: string;
  tensionManagement: string;
  technique: string;

  // UI labels
  title: string;
  subtitle: string;
  calculateButton: string;
  resetButton: string;
  yourResults: string;
  topRecommendation: string;
  otherRecommendations: string;
  currentLevel: string;
  roiScore: string;
  weight: string;
  learnMore: string;
  overallScore: string;
  saveResults: string;
  savedMessage: string;

  // Levels
  levelBeginner: string;
  levelDeveloping: string;
  levelCompetent: string;
  levelAdvanced: string;
  levelWorldClass: string;

  // Peer validation
  getPeerFeedback: string;
  shareLink: string;
  copyLink: string;
  linkCopied: string;
  yourName: string;
  yourNamePlaceholder: string;
  peerReviewTitle: string;
  peerReviewSubtitle: string;
  peerReviewInstructions: string;
  ratingPlayer: string;
  submitPeerReview: string;
  comparison: string;
  selfAssessment: string;
  peerAssessment: string;
  difference: string;
  blindSpotWarning: string;
  mayOverestimate: string;
  mayUnderestimate: string;
  shareResultsTitle: string;
  shareResultsDesc: string;
  resultsTitle: string;
  feedbackFrom: string;
  saveFeedback: string;
  feedbackSaved: string;
  closeComparison: string;

  // History
  historyTitle: string;
  historyEmpty: string;
  historyViewAll: string;
  historyCompare: string;
  historyDelete: string;
  historyProgress: string;
  historyDate: string;
  historyScore: string;
  historyImproved: string;
  historyDeclined: string;
  historyNoChange: string;
  clearHistory: string;
  clearHistoryConfirm: string;
  loadAssessment: string;
  shareAssessment: string;
  requestFeedback: string;
  copyFeedbackLink: string;
  cancel: string;
  feedbackHint: string;

  // Feedback Library
  libraryTitle: string;
  myProgress: string;
  feedbackReceived: string;
  feedbackGiven: string;
  noAssessments: string;
  noReceivedFeedback: string;
  noGivenFeedback: string;
  sinceLast: string;
  theirSelf: string;
  myRating: string;
}

export const assessmentI18n: Record<string, AssessmentLabels> = {
  en: {
    mentalGame: 'Mental Game',
    motivation: 'Motivation',
    sleep: 'Sleep & Recovery',
    selfAwareness: 'Self-Awareness',
    nutrition: 'Nutrition',
    teamDynamics: 'Team Dynamics',
    tensionManagement: 'Tension Management',
    technique: 'Technique',

    title: 'Your Development Assessment',
    subtitle: 'Rate yourself on 8 key performance factors to discover your optimal improvement path',
    calculateButton: 'Calculate My Path',
    resetButton: 'Reset',
    yourResults: 'Your Results',
    topRecommendation: 'Your #1 Focus Area',
    otherRecommendations: 'Other Opportunities',
    currentLevel: 'Current',
    roiScore: 'ROI Score',
    weight: 'Weight',
    learnMore: 'Learn More',
    overallScore: 'Overall Score',
    saveResults: 'Save Results',
    savedMessage: 'Results saved!',

    levelBeginner: 'Beginner',
    levelDeveloping: 'Developing',
    levelCompetent: 'Competent',
    levelAdvanced: 'Advanced',
    levelWorldClass: 'World-class',

    getPeerFeedback: 'Get Peer Feedback',
    shareLink: 'Share this link with a teammate to get their assessment of you:',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied!',
    yourName: 'Your name',
    yourNamePlaceholder: 'Enter your name (optional)',
    peerReviewTitle: 'Peer Assessment Request',
    peerReviewSubtitle: 'A teammate has asked for your honest feedback. Rate them on each factor based on YOUR perception — not what they think of themselves.',
    peerReviewInstructions: 'After you submit, you\'ll see how your ratings compare to their self-assessment. Large gaps reveal potential blind spots.',
    ratingPlayer: 'You are rating',
    submitPeerReview: 'Submit My Assessment',
    comparison: 'Self vs Peer Comparison',
    selfAssessment: 'Self',
    peerAssessment: 'Peer',
    difference: 'Gap',
    blindSpotWarning: '⚠️ Large gap detected - possible blind spot',
    mayOverestimate: 'may overestimate',
    mayUnderestimate: 'may underestimate',
    shareResultsTitle: '📤 Share Results Back',
    shareResultsDesc: 'Copy this link and send it back to your teammate so they can see the comparison:',
    resultsTitle: 'Your Peer Feedback Results',
    feedbackFrom: 'Feedback from',
    saveFeedback: '💾 Save This Feedback',
    feedbackSaved: '✓ Saved!',
    closeComparison: 'Close',

    historyTitle: 'Your Progress Over Time',
    historyEmpty: 'No previous assessments yet. Complete an assessment and save it to start tracking your progress.',
    historyViewAll: 'View All History',
    historyCompare: 'Compare',
    historyDelete: 'Delete',
    historyProgress: 'Progress',
    historyDate: 'Date',
    historyScore: 'Score',
    historyImproved: 'improved',
    historyDeclined: 'declined',
    historyNoChange: 'no change',
    clearHistory: 'Clear All History',
    clearHistoryConfirm: 'Are you sure? This cannot be undone.',
    loadAssessment: 'Load this assessment',
    shareAssessment: 'Share this assessment',
    requestFeedback: 'Request peer feedback',
    copyFeedbackLink: 'Copy Feedback Link',
    cancel: 'Cancel',
    feedbackHint: 'Share this link with a teammate to get their assessment of you',

    libraryTitle: 'Feedback Library',
    myProgress: 'My Progress',
    feedbackReceived: 'Feedback Received',
    feedbackGiven: 'Feedback Given',
    noAssessments: 'No assessments yet. Complete your first assessment to start tracking progress.',
    noReceivedFeedback: 'No feedback received yet. Share your assessment link with teammates to get feedback.',
    noGivenFeedback: 'No feedback given yet. When you assess a teammate, it will appear here.',
    sinceLast: 'since last',
    theirSelf: 'Their Self',
    myRating: 'My Rating'
  },
  sv: {
    mentalGame: 'Mental Styrka',
    motivation: 'Motivation',
    sleep: 'Sömn & Återhämtning',
    selfAwareness: 'Självinsikt',
    nutrition: 'Kost',
    teamDynamics: 'Teamdynamik',
    tensionManagement: 'Spänningshantering',
    technique: 'Teknik',

    title: 'Din Utvecklingsutvärdering',
    subtitle: 'Bedöm dig själv på 8 nyckelfaktorer för att hitta din optimala förbättringsväg',
    calculateButton: 'Beräkna Min Väg',
    resetButton: 'Återställ',
    yourResults: 'Dina Resultat',
    topRecommendation: 'Ditt #1 Fokusområde',
    otherRecommendations: 'Andra Möjligheter',
    currentLevel: 'Nuvarande',
    roiScore: 'ROI-poäng',
    weight: 'Vikt',
    learnMore: 'Läs Mer',
    overallScore: 'Totalpoäng',
    saveResults: 'Spara Resultat',
    savedMessage: 'Resultaten sparade!',

    levelBeginner: 'Nybörjare',
    levelDeveloping: 'Utvecklande',
    levelCompetent: 'Kompetent',
    levelAdvanced: 'Avancerad',
    levelWorldClass: 'Världsklass',

    getPeerFeedback: 'Få Feedback från Lagkamrat',
    shareLink: 'Dela denna länk med en lagkamrat för att få deras bedömning av dig:',
    copyLink: 'Kopiera Länk',
    linkCopied: 'Länk kopierad!',
    yourName: 'Ditt namn',
    yourNamePlaceholder: 'Ange ditt namn (valfritt)',
    peerReviewTitle: 'Förfrågan om Lagkamratbedömning',
    peerReviewSubtitle: 'En lagkamrat har bett om din ärliga feedback. Bedöm dem på varje faktor baserat på DIN uppfattning — inte vad de tror om sig själva.',
    peerReviewInstructions: 'Efter att du skickat ser du hur din bedömning jämförs med deras självbedömning. Stora skillnader avslöjar möjliga blinda fläckar.',
    ratingPlayer: 'Du bedömer',
    submitPeerReview: 'Skicka Min Bedömning',
    comparison: 'Själv vs Lagkamrat Jämförelse',
    selfAssessment: 'Själv',
    peerAssessment: 'Kamrat',
    difference: 'Skillnad',
    blindSpotWarning: '⚠️ Stor skillnad upptäckt - möjlig blind fläck',
    mayOverestimate: 'överskattar troligen',
    mayUnderestimate: 'underskattar troligen',
    shareResultsTitle: '📤 Dela Resultaten Tillbaka',
    shareResultsDesc: 'Kopiera denna länk och skicka tillbaka till din lagkamrat så de kan se jämförelsen:',
    resultsTitle: 'Din Lagkamratfeedback',
    feedbackFrom: 'Feedback från',
    saveFeedback: '💾 Spara Denna Feedback',
    feedbackSaved: '✓ Sparad!',
    closeComparison: 'Stäng',

    historyTitle: 'Din Utveckling Över Tid',
    historyEmpty: 'Inga tidigare utvärderingar ännu. Gör en utvärdering och spara den för att börja följa din utveckling.',
    historyViewAll: 'Visa All Historik',
    historyCompare: 'Jämför',
    historyDelete: 'Ta bort',
    historyProgress: 'Utveckling',
    historyDate: 'Datum',
    historyScore: 'Poäng',
    historyImproved: 'förbättrat',
    historyDeclined: 'försämrat',
    historyNoChange: 'oförändrat',
    clearHistory: 'Rensa All Historik',
    clearHistoryConfirm: 'Är du säker? Detta kan inte ångras.',
    loadAssessment: 'Ladda denna utvärdering',
    shareAssessment: 'Dela denna utvärdering',
    requestFeedback: 'Be om feedback',
    copyFeedbackLink: 'Kopiera Feedbacklänk',
    cancel: 'Avbryt',
    feedbackHint: 'Dela länken med en lagkamrat för att få deras bedömning av dig',

    libraryTitle: 'Feedbackbibliotek',
    myProgress: 'Min Progress',
    feedbackReceived: 'Mottagen Feedback',
    feedbackGiven: 'Given Feedback',
    noAssessments: 'Inga utvärderingar ännu. Gör din första utvärdering för att börja följa din progress.',
    noReceivedFeedback: 'Ingen feedback mottagen ännu. Dela din utvärderingslänk med lagkamrater för att få feedback.',
    noGivenFeedback: 'Ingen feedback given ännu. När du bedömer en lagkamrat visas det här.',
    sinceLast: 'sedan senast',
    theirSelf: 'Deras Själv',
    myRating: 'Min Bedömning'
  },
  fr: {
    mentalGame: 'Jeu Mental',
    motivation: 'Motivation',
    sleep: 'Sommeil & Récupération',
    selfAwareness: 'Conscience de Soi',
    nutrition: 'Nutrition',
    teamDynamics: 'Dynamique d\'Équipe',
    tensionManagement: 'Gestion du Stress',
    technique: 'Technique',

    title: 'Votre Évaluation de Développement',
    subtitle: 'Évaluez-vous sur 8 facteurs clés pour découvrir votre parcours optimal',
    calculateButton: 'Calculer Mon Parcours',
    resetButton: 'Réinitialiser',
    yourResults: 'Vos Résultats',
    topRecommendation: 'Votre Priorité #1',
    otherRecommendations: 'Autres Opportunités',
    currentLevel: 'Actuel',
    roiScore: 'Score ROI',
    weight: 'Poids',
    learnMore: 'En Savoir Plus',
    overallScore: 'Score Global',
    saveResults: 'Sauvegarder',
    savedMessage: 'Résultats sauvegardés!',

    levelBeginner: 'Débutant',
    levelDeveloping: 'En Développement',
    levelCompetent: 'Compétent',
    levelAdvanced: 'Avancé',
    levelWorldClass: 'Classe Mondiale',

    getPeerFeedback: 'Obtenir un Avis',
    shareLink: 'Partagez ce lien avec un coéquipier pour obtenir son évaluation:',
    copyLink: 'Copier le Lien',
    linkCopied: 'Lien copié!',
    yourName: 'Votre nom',
    yourNamePlaceholder: 'Entrez votre nom (optionnel)',
    peerReviewTitle: 'Demande d\'Évaluation par un Pair',
    peerReviewSubtitle: 'Un coéquipier vous demande votre avis honnête. Évaluez-le sur chaque facteur selon VOTRE perception — pas ce qu\'il pense de lui-même.',
    peerReviewInstructions: 'Après soumission, vous verrez comment vos notes se comparent à son auto-évaluation. Les grands écarts révèlent des angles morts potentiels.',
    ratingPlayer: 'Vous évaluez',
    submitPeerReview: 'Soumettre Mon Évaluation',
    comparison: 'Comparaison Auto vs Pair',
    selfAssessment: 'Auto',
    peerAssessment: 'Pair',
    difference: 'Écart',
    blindSpotWarning: '⚠️ Grand écart détecté - angle mort possible',
    mayOverestimate: 'surestime peut-être',
    mayUnderestimate: 'sous-estime peut-être',
    shareResultsTitle: '📤 Partager les Résultats',
    shareResultsDesc: 'Copiez ce lien et renvoyez-le à votre coéquipier pour qu\'il puisse voir la comparaison:',
    resultsTitle: 'Vos Résultats de Feedback',
    feedbackFrom: 'Feedback de',
    closeComparison: 'Fermer'
  }
};

// German
assessmentI18n['de'] = {
  mentalGame: 'Mentales Spiel',
  motivation: 'Motivation',
  sleep: 'Schlaf & Erholung',
  selfAwareness: 'Selbstwahrnehmung',
  nutrition: 'Ernährung',
  teamDynamics: 'Teamdynamik',
  tensionManagement: 'Spannungsmanagement',
  technique: 'Technik',
  title: 'Deine Entwicklungsbewertung',
  subtitle: 'Bewerte dich in 8 Leistungsfaktoren, um deinen optimalen Verbesserungsweg zu entdecken',
  calculateButton: 'Meinen Weg Berechnen',
  resetButton: 'Zurücksetzen',
  yourResults: 'Deine Ergebnisse',
  topRecommendation: 'Dein #1 Fokusbereich',
  otherRecommendations: 'Weitere Möglichkeiten',
  currentLevel: 'Aktuell',
  roiScore: 'ROI-Wert',
  weight: 'Gewicht',
  learnMore: 'Mehr Erfahren',
  overallScore: 'Gesamtwert',
  saveResults: 'Ergebnisse Speichern',
  savedMessage: 'Gespeichert!',
  levelBeginner: 'Anfänger',
  levelDeveloping: 'Entwickelnd',
  levelCompetent: 'Kompetent',
  levelAdvanced: 'Fortgeschritten',
  levelWorldClass: 'Weltklasse'
};

// Spanish
assessmentI18n['es'] = {
  mentalGame: 'Juego Mental',
  motivation: 'Motivación',
  sleep: 'Sueño y Recuperación',
  selfAwareness: 'Autoconocimiento',
  nutrition: 'Nutrición',
  teamDynamics: 'Dinámica de Equipo',
  tensionManagement: 'Gestión del Estrés',
  technique: 'Técnica',
  title: 'Tu Evaluación de Desarrollo',
  subtitle: 'Evalúate en 8 factores clave para descubrir tu camino óptimo de mejora',
  calculateButton: 'Calcular Mi Camino',
  resetButton: 'Reiniciar',
  yourResults: 'Tus Resultados',
  topRecommendation: 'Tu Prioridad #1',
  otherRecommendations: 'Otras Oportunidades',
  currentLevel: 'Actual',
  roiScore: 'Puntuación ROI',
  weight: 'Peso',
  learnMore: 'Saber Más',
  overallScore: 'Puntuación Total',
  saveResults: 'Guardar Resultados',
  savedMessage: '¡Guardado!',
  levelBeginner: 'Principiante',
  levelDeveloping: 'En Desarrollo',
  levelCompetent: 'Competente',
  levelAdvanced: 'Avanzado',
  levelWorldClass: 'Clase Mundial'
};

// Danish
assessmentI18n['da'] = {
  mentalGame: 'Mentalt Spil',
  motivation: 'Motivation',
  sleep: 'Søvn & Restitution',
  selfAwareness: 'Selvindsigt',
  nutrition: 'Ernæring',
  teamDynamics: 'Teamdynamik',
  tensionManagement: 'Spændingshåndtering',
  technique: 'Teknik',
  title: 'Din Udviklingsvurdering',
  subtitle: 'Vurder dig selv på 8 nøglefaktorer for at finde din optimale forbedringsvej',
  calculateButton: 'Beregn Min Vej',
  resetButton: 'Nulstil',
  yourResults: 'Dine Resultater',
  topRecommendation: 'Dit #1 Fokusområde',
  otherRecommendations: 'Andre Muligheder',
  currentLevel: 'Nuværende',
  roiScore: 'ROI-score',
  weight: 'Vægt',
  learnMore: 'Læs Mere',
  overallScore: 'Samlet Score',
  saveResults: 'Gem Resultater',
  savedMessage: 'Gemt!',
  levelBeginner: 'Begynder',
  levelDeveloping: 'Udviklende',
  levelCompetent: 'Kompetent',
  levelAdvanced: 'Avanceret',
  levelWorldClass: 'Verdensklasse'
};

// Norwegian
assessmentI18n['no'] = {
  mentalGame: 'Mentalt Spill',
  motivation: 'Motivasjon',
  sleep: 'Søvn & Restitusjon',
  selfAwareness: 'Selvinnsikt',
  nutrition: 'Ernæring',
  teamDynamics: 'Teamdynamikk',
  tensionManagement: 'Spenningshåndtering',
  technique: 'Teknikk',
  title: 'Din Utviklingsvurdering',
  subtitle: 'Vurder deg selv på 8 nøkkelfaktorer for å finne din optimale forbedringsvei',
  calculateButton: 'Beregn Min Vei',
  resetButton: 'Nullstill',
  yourResults: 'Dine Resultater',
  topRecommendation: 'Ditt #1 Fokusområde',
  otherRecommendations: 'Andre Muligheter',
  currentLevel: 'Nåværende',
  roiScore: 'ROI-poeng',
  weight: 'Vekt',
  learnMore: 'Les Mer',
  overallScore: 'Total Score',
  saveResults: 'Lagre Resultater',
  savedMessage: 'Lagret!',
  levelBeginner: 'Nybegynner',
  levelDeveloping: 'Under Utvikling',
  levelCompetent: 'Kompetent',
  levelAdvanced: 'Avansert',
  levelWorldClass: 'Verdensklasse'
};

// Italian
assessmentI18n['it'] = {
  mentalGame: 'Gioco Mentale',
  motivation: 'Motivazione',
  sleep: 'Sonno e Recupero',
  selfAwareness: 'Autoconsapevolezza',
  nutrition: 'Nutrizione',
  teamDynamics: 'Dinamiche di Squadra',
  tensionManagement: 'Gestione della Tensione',
  technique: 'Tecnica',
  title: 'La Tua Valutazione di Sviluppo',
  subtitle: 'Valutati su 8 fattori chiave per scoprire il tuo percorso ottimale',
  calculateButton: 'Calcola Il Mio Percorso',
  resetButton: 'Reimposta',
  yourResults: 'I Tuoi Risultati',
  topRecommendation: 'La Tua Priorità #1',
  otherRecommendations: 'Altre Opportunità',
  currentLevel: 'Attuale',
  roiScore: 'Punteggio ROI',
  weight: 'Peso',
  learnMore: 'Scopri di Più',
  overallScore: 'Punteggio Totale',
  saveResults: 'Salva Risultati',
  savedMessage: 'Salvato!',
  levelBeginner: 'Principiante',
  levelDeveloping: 'In Sviluppo',
  levelCompetent: 'Competente',
  levelAdvanced: 'Avanzato',
  levelWorldClass: 'Classe Mondiale'
};

// Dutch
assessmentI18n['nl'] = {
  mentalGame: 'Mentaal Spel',
  motivation: 'Motivatie',
  sleep: 'Slaap & Herstel',
  selfAwareness: 'Zelfbewustzijn',
  nutrition: 'Voeding',
  teamDynamics: 'Teamdynamiek',
  tensionManagement: 'Spanning Beheer',
  technique: 'Techniek',
  title: 'Jouw Ontwikkelingsbeoordeling',
  subtitle: 'Beoordeel jezelf op 8 sleutelfactoren om je optimale verbeterpad te ontdekken',
  calculateButton: 'Bereken Mijn Pad',
  resetButton: 'Reset',
  yourResults: 'Jouw Resultaten',
  topRecommendation: 'Jouw #1 Focusgebied',
  otherRecommendations: 'Andere Mogelijkheden',
  currentLevel: 'Huidig',
  roiScore: 'ROI-score',
  weight: 'Gewicht',
  learnMore: 'Meer Leren',
  overallScore: 'Totaalscore',
  saveResults: 'Resultaten Opslaan',
  savedMessage: 'Opgeslagen!',
  levelBeginner: 'Beginner',
  levelDeveloping: 'Ontwikkelend',
  levelCompetent: 'Competent',
  levelAdvanced: 'Gevorderd',
  levelWorldClass: 'Wereldklasse'
};

// Portuguese
assessmentI18n['pt'] = {
  mentalGame: 'Jogo Mental',
  motivation: 'Motivação',
  sleep: 'Sono e Recuperação',
  selfAwareness: 'Autoconsciência',
  nutrition: 'Nutrição',
  teamDynamics: 'Dinâmica de Equipe',
  tensionManagement: 'Gestão da Tensão',
  technique: 'Técnica',
  title: 'Sua Avaliação de Desenvolvimento',
  subtitle: 'Avalie-se em 8 fatores-chave para descobrir seu caminho ideal de melhoria',
  calculateButton: 'Calcular Meu Caminho',
  resetButton: 'Reiniciar',
  yourResults: 'Seus Resultados',
  topRecommendation: 'Sua Prioridade #1',
  otherRecommendations: 'Outras Oportunidades',
  currentLevel: 'Atual',
  roiScore: 'Pontuação ROI',
  weight: 'Peso',
  learnMore: 'Saiba Mais',
  overallScore: 'Pontuação Total',
  saveResults: 'Salvar Resultados',
  savedMessage: 'Salvo!',
  levelBeginner: 'Iniciante',
  levelDeveloping: 'Em Desenvolvimento',
  levelCompetent: 'Competente',
  levelAdvanced: 'Avançado',
  levelWorldClass: 'Classe Mundial'
};

// Add more languages - they will fall back to English if not defined
export function getLabels(lang: string): AssessmentLabels {
  return assessmentI18n[lang] || assessmentI18n['en'];
}

