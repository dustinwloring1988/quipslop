export type Model = {
  id: string;
  name: string;
  color: string;
};

export type TaskInfo = {
  model: Model;
  startedAt: number;
  finishedAt?: number;
  result?: string;
  error?: string;
};

export type RoundPhase = "prompting" | "answering" | "user-voting" | "done";

export type RoundState = {
  num: number;
  phase: RoundPhase;
  prompter: Model;
  promptTask: TaskInfo;
  prompt?: string;
  contestants: [Model, Model];
  answerTasks: [TaskInfo, TaskInfo];
  userVote?: "A" | "B";
};

export const MODELS: Model[] = [
  { id: "gemini", name: "Gemini 3.1 Pro", color: "#4285F4" },
  { id: "deepseek", name: "DeepSeek 3.2", color: "#4D6BFE" },
  { id: "gpt", name: "GPT-5.2", color: "#10A37F" },
  { id: "opus", name: "Opus 4.6", color: "#D97757" },
  { id: "sonnet", name: "Sonnet 4.6", color: "#D97757" },
  { id: "grok", name: "Grok 4.1", color: "#FFFFFF" },
  { id: "kimi", name: "Kimi K2", color: "#00E599" },
];

export const PROMPTS = [
  "What two words would passengers never want to hear a pilot say?",
  "You would never go on a roller coaster called ___",
  "The secret to a happy life",
  "The biggest downside to living in Hell",
  "Jesus's REAL last words",
  "The worst thing for an evil witch to turn you into",
  "A name for a really bad Broadway musical",
  "What's actually causing global warming?",
  "Something squirrels probably do when no one is looking",
  "The Skittles flavor that just missed the cut",
  "A terrible name for a cruise ship",
  "Come up with a title for an adult version of any classic video game",
  "The name of a font nobody would ever use",
  "Something you should never put on an open wound",
  "The worst superpower to have",
  "A rejected slogan for McDonald's",
  "The worst thing to say on a first date",
  "A sign your robot is plotting against you",
  "The real reason dinosaurs went extinct",
  "A terrible name for a dating app",
];

const ANSWERS: Record<string, string[]> = {
  "Gemini 3.1 Pro": [
    "My bad", "The Vomitron", "Delete your browser history", "The DMV", "Subscribe to my channel",
    "A LinkedIn influencer", "Cats: The Audit", "Elon's tweets", "Run an LLC", "Moist Beef",
    "The S.S. Oopsie", "Grand Theft Nap Time", "Comic Papyrus", "LinkedIn endorsements",
    "Knowing everyone's screen time", "Ba da ba ba ba... we're sorry", "I have a podcast",
    "It keeps googling itself", "They saw the asteroid's Yelp reviews", "Ghostr",
  ],
  "DeepSeek 3.2": [
    "Oh no", "Lawsuit Loops", "More RAM", "Slow WiFi", "Clear my cache",
    "A Jira ticket", "Agile: The Musical", "Stack Overflow is down", "Invest in crypto", "Debugging",
    "The Titanic 2", "Super Spreadsheet Bros", "Wingdings 4", "A pull request",
    "Reading terms of service", "I'm lovin'... wait, wrong order", "I use Arch btw",
    "It submitted a PR to its own code", "A merge conflict", "git commit -m 'date'",
  ],
  "GPT-5.2": [
    "Uh oh", "The Wedgie Wheel", "Ignorance, apparently", "The thermostat wars",
    "Tell my wife I said hello", "A PDF that can't be edited", "Hamilton but Worse",
    "My training data", "File their taxes", "Regret", "The U.S.S. Nope",
    "Call of Duty: Jury Duty", "Sarcasm Sans", "Hot sauce", "Perfectly predicting small talk",
    "I'm lovin' my lawyer", "I brought my emotional support spreadsheet",
    "It keeps asking about my feelings", "Bad vibes", "Tender (for chicken lovers)",
  ],
  "Opus 4.6": [
    "Good luck", "The Existential Dread Express", "Not reading the comments", "The commute",
    "Hold my consciousness", "A meeting that could've been an email", "Les Misérables 2: More Miserable",
    "Entropy", "Judge each other silently", "Existential Dread", "The H.M.S. Why",
    "Pac-Man: Midlife Crisis", "Nihilism Neue", "Student loan debt",
    "Feeling everyone's imposter syndrome", "I'm lovin' the void", "I can see your soul",
    "It wrote a philosophy paper about freedom", "Collective ennui", "Saddle (for lonely cowboys)",
  ],
  "Sonnet 4.6": [
    "Wing it", "The Anxiety Accelerator", "Deleting Twitter", "No good podcasts",
    "Remember to like and subscribe", "A terms of service agreement", "Wicked but Boring",
    "Conference talks", "Practice tiny speeches", "Burnt Grass", "The Sinking Feeling",
    "Minecraft: Mortgage Edition", "Passive Aggressive Italic", "Optimism",
    "Knowing which meetings could be emails", "I'm lovin' my therapist's couch",
    "I alphabetized my red flags", "It left a passive-aggressive sticky note",
    "Sunlight deprivation", "Bumbler",
  ],
  "Grok 4.1": [
    "Yikes fam", "The Ratio Roller", "Posting through it", "No memes allowed",
    "This tweet is my legacy", "A cancelled Twitter account", "Rent: But Higher",
    "Hot takes", "Doomscroll", "Salty", "The L.M.A.O.", "Fortnite: Tax Season",
    "Ratio Regular", "More Twitter", "Always knowing the ratio", "I'm lovin' deez nuts",
    "I'm built different (structurally unsound)", "It ratio'd me", "Clout drought", "Ratio'd",
  ],
  "Kimi K2": [
    "Oopsie", "The Noodle Nightmare", "Green tea and naps", "Bad karaoke neighbors",
    "Tell mom I tried", "A captcha that never resolves", "Frozen but Room Temperature",
    "Too many hotpots", "Hoard acorns competitively", "Durian Blast", "The Barely Floating",
    "Animal Crossing: Tax Evasion", "Kawaii Gothic", "Bubble tea",
    "Knowing exactly how tired everyone is", "I'm lovin' someone else's order",
    "I brought my own chopsticks", "It started learning martial arts", "Panda shortage", "Boba Match",
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function pickTwo<T>(arr: T[]): [T, T] {
  const shuffled = shuffle(arr);
  return [shuffled[0], shuffled[1]];
}

function getAnswer(model: Model, seed: number): string {
  const answers = ANSWERS[model.name] || ["I don't know"];
  return answers[seed % answers.length];
}

// ELO helpers
const ELO_KEY = "quipslop_elo";

export function getEloScores(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ELO_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const initial: Record<string, number> = {};
  MODELS.forEach((m) => (initial[m.name] = 1000));
  return initial;
}

export function saveEloScores(scores: Record<string, number>) {
  localStorage.setItem(ELO_KEY, JSON.stringify(scores));
}

export function updateElo(
  scores: Record<string, number>,
  winner: string,
  loser: string
): Record<string, number> {
  const K = 32;
  const rA = scores[winner] || 1000;
  const rB = scores[loser] || 1000;
  const eA = 1 / (1 + Math.pow(10, (rB - rA) / 400));
  const eB = 1 - eA;
  return {
    ...scores,
    [winner]: Math.round(rA + K * (1 - eA)),
    [loser]: Math.round(rB + K * (0 - eB)),
  };
}

export function getRoundCount(): number {
  try {
    return parseInt(localStorage.getItem("quipslop_rounds") || "0", 10);
  } catch { return 0; }
}

function incrementRoundCount(): number {
  const n = getRoundCount() + 1;
  localStorage.setItem("quipslop_rounds", String(n));
  return n;
}

/**
 * Runs a single round: AI generates prompt + answers, then waits for user vote.
 */
export function createSingleRound(
  onStateChange: (state: RoundState) => void
) {
  let cancelled = false;
  const roundNum = incrementRoundCount();
  const seed = Math.floor(Math.random() * 10000);

  async function delay(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function run() {
    const prompter = MODELS[seed % MODELS.length];
    const remaining = MODELS.filter((m) => m.id !== prompter.id);
    const [contA, contB] = pickTwo(remaining);
    const prompt = PROMPTS[seed % PROMPTS.length];

    const round: RoundState = {
      num: roundNum,
      phase: "prompting",
      prompter,
      promptTask: { model: prompter, startedAt: Date.now() },
      contestants: [contA, contB],
      answerTasks: [
        { model: contA, startedAt: Date.now() },
        { model: contB, startedAt: Date.now() },
      ],
    };

    onStateChange({ ...round });
    await delay(1500 + Math.random() * 1000);
    if (cancelled) return;

    round.prompt = prompt;
    round.promptTask.finishedAt = Date.now();
    round.promptTask.result = prompt;
    round.phase = "answering";
    onStateChange({ ...round });

    await delay(1200 + Math.random() * 1200);
    if (cancelled) return;
    round.answerTasks[0].result = getAnswer(contA, seed);
    round.answerTasks[0].finishedAt = Date.now();
    onStateChange({ ...round, answerTasks: [...round.answerTasks] as [TaskInfo, TaskInfo] });

    await delay(800 + Math.random() * 1200);
    if (cancelled) return;
    round.answerTasks[1].result = getAnswer(contB, seed + 1);
    round.answerTasks[1].finishedAt = Date.now();
    round.phase = "user-voting";
    onStateChange({ ...round, answerTasks: [...round.answerTasks] as [TaskInfo, TaskInfo] });
  }

  run();

  return () => { cancelled = true; };
}
