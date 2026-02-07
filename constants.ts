
import { LifePath } from './types';

export const LEVEL_RANKS = [
  { name: 'BRONZE', minLevel: 1 },
  { name: 'SILVER', minLevel: 2 },      // +1 from prev
  { name: 'GOLD', minLevel: 4 },        // +2 from prev
  { name: 'PLATINUM', minLevel: 8 },    // +4 from prev
  { name: 'DIAMOND', minLevel: 14 },   // +6 from prev
  { name: 'MASTER', minLevel: 22 },    // +8 from prev
  { name: 'GRANDMASTER', minLevel: 32 }, // +10 from prev
  { name: 'ELITE', minLevel: 44 }      // +12 from prev
];

export const getRank = (level: number) => {
  let currentRank = LEVEL_RANKS[0].name;
  for (const rank of LEVEL_RANKS) {
    if (level >= rank.minLevel) {
      currentRank = rank.name;
    } else {
      break;
    }
  }
  return currentRank;
};

export const MOCK_LEADERBOARD = [
  { username: 'V_STRIKER', level: 48, sessions: 156, rank: 'ELITE' },
  { username: 'GHOST_OPS', level: 38, sessions: 142, rank: 'GRANDMASTER' },
  { username: 'DISCIPLINE_X', level: 35, sessions: 120, rank: 'GRANDMASTER' },
  { username: 'NEO_ZEN', level: 25, sessions: 98, rank: 'MASTER' },
  { username: 'COBALT', level: 18, sessions: 85, rank: 'DIAMOND' },
  { username: 'AXEL_LOCK', level: 15, sessions: 77, rank: 'DIAMOND' },
  { username: 'RAVEN_7', level: 10, sessions: 64, rank: 'PLATINUM' },
  { username: 'ZERO_COLD', level: 5, sessions: 52, rank: 'GOLD' },
];

export const PATH_METADATA = {
  [LifePath.PRODUCTIVE]: {
    title: 'Become more productive',
    description: 'Optimize your time and crush your goals.',
    missions: [
      { text: '30-minute study focus', type: 'WORK' },
      { text: 'Clean your workspace', type: 'HABIT' },
      { text: 'Write tomorrow\'s main goal', type: 'PLAN' },
      { text: 'Read 15 pages of a book', type: 'MIND' },
      { text: 'No social media for 3 hours', type: 'FOCUS' },
      { text: 'Respond to all pending emails', type: 'WORK' },
      { text: 'Organize your desktop files', type: 'HABIT' },
      { text: 'Plan your next week', type: 'PLAN' },
      { text: 'Listen to a productivity podcast', type: 'MIND' },
      { text: 'Turn off notifications for 4 hours', type: 'FOCUS' },
      { text: 'Block distracting sites for 1 hour', type: 'WORK' },
      { text: 'Batch all minor tasks into 20 mins', type: 'WORK' },
      { text: 'Set a timer for every task today', type: 'HABIT' },
      { text: 'Review today\'s performance', type: 'MIND' }
    ]
  },
  [LifePath.STRONGER]: {
    title: 'Become stronger',
    description: 'Build your body and your physical resilience.',
    missions: [
      { text: '30 push-ups', type: 'BODY' },
      { text: 'Drink 3L of water today', type: 'BODY' },
      { text: 'Sleep before 11 PM', type: 'RECOVERY' },
      { text: '20-minute morning stretch', type: 'BODY' },
      { text: 'Cold shower (3 minutes)', type: 'MIND' },
      { text: 'No sugar for 24 hours', type: 'DIET' },
      { text: 'Go for a 5km run', type: 'BODY' },
      { text: '1 minute plank', type: 'BODY' },
      { text: 'Eat a high-protein breakfast', type: 'DIET' },
      { text: '10 pull-ups or negatives', type: 'BODY' },
      { text: '50 bodyweight squats', type: 'BODY' },
      { text: 'Walk 10,000 steps', type: 'BODY' },
      { text: 'No caffeine after 2 PM', type: 'RECOVERY' },
      { text: 'Sunlight exposure for 15 mins', type: 'RECOVERY' }
    ]
  },
  [LifePath.EXTROVERT]: {
    title: 'Introvert → Extrovert',
    description: 'Master the art of social presence.',
    missions: [
      { text: 'Greet one stranger', type: 'SOCIAL' },
      { text: 'Start a chat with an acquaintance', type: 'SOCIAL' },
      { text: 'Maintain eye contact in convo', type: 'SOCIAL' },
      { text: 'Compliment someone today', type: 'SOCIAL' },
      { text: 'Call an old friend', type: 'SOCIAL' },
      { text: 'Speak up in a group setting', type: 'SOCIAL' },
      { text: 'Ask someone for advice', type: 'SOCIAL' },
      { text: 'Go to a public place alone', type: 'MIND' },
      { text: 'Smile at three people today', type: 'SOCIAL' },
      { text: 'Record a video message to a friend', type: 'SOCIAL' },
      { text: 'Practice public speaking (2 mins)', type: 'MIND' },
      { text: 'Ask an open-ended question', type: 'SOCIAL' },
      { text: 'Listen more than you speak', type: 'SOCIAL' },
      { text: 'Attend a social event', type: 'SOCIAL' }
    ]
  },
  [LifePath.DISCIPLINE]: {
    title: 'Better discipline',
    description: 'Forging an unbreakable mind.',
    missions: [
      { text: 'Make your bed immediately', type: 'HABIT' },
      { text: 'No junk food today', type: 'DIET' },
      { text: '30-min deep work session', type: 'FOCUS' },
      { text: 'Zero complaining for 24h', type: 'MIND' },
      { text: 'Meditate for 10 minutes', type: 'MIND' },
      { text: 'Wake up at first alarm', type: 'HABIT' },
      { text: 'Do the task you fear most', type: 'MIND' },
      { text: 'No music for 2 hours', type: 'FOCUS' },
      { text: 'Read 20 mins before bed', type: 'HABIT' },
      { text: 'Digital detox for 4 hours', type: 'FOCUS' },
      { text: 'Finish a task to 100% completion', type: 'HABIT' },
      { text: 'Practice delayed gratification', type: 'MIND' },
      { text: 'Keep your phone in another room', type: 'FOCUS' },
      { text: 'Review your long-term goals', type: 'PLAN' }
    ]
  },
  [LifePath.MENTAL_HEALTH]: {
    title: 'Better mental health',
    description: 'Find peace in the chaos of life.',
    missions: [
      { text: 'Write 3 gratitudes', type: 'SOUL' },
      { text: '10 mins of box breathing', type: 'SOUL' },
      { text: 'No screens 1h before bed', type: 'HABIT' },
      { text: 'Journal your thoughts', type: 'MIND' },
      { text: 'Go for a nature walk', type: 'BODY' },
      { text: 'Sit in silence for 5 mins', type: 'SOUL' },
      { text: 'Avoid negative news today', type: 'MIND' },
      { text: 'Drink a calming tea', type: 'BODY' },
      { text: 'Forgive one small annoyance', type: 'SOUL' },
      { text: 'Create something (draw/write)', type: 'MIND' },
      { text: 'Practice mindfulness while eating', type: 'SOUL' },
      { text: 'Listen to calming music', type: 'RECOVERY' },
      { text: 'Unfollow one toxic account', type: 'MIND' },
      { text: 'Write a letter to yourself', type: 'SOUL' }
    ]
  }
};

export const MOTIVATIONAL_QUOTES = [
  "Discipline is doing what needs to be done, even if you don't want to.",
  "Your future self is watching you right now through memories.",
  "Pain is temporary. Pride is forever.",
  "The only person you are competing with is the you from yesterday.",
  "Success is not final, failure is not fatal.",
  "Don't stop when you're tired. Stop when you're done.",
  "LOCK IN. No distractions."
];

export const BADGES = [
  { id: 'LOCKED_IN', name: 'LOCKED IN', requirement: 'First focus session' },
  { id: 'DISCIPLINED', name: 'DISCIPLINED', requirement: 'Complete all daily missions' },
  { id: 'RELENTLESS', name: 'RELENTLESS', requirement: '10 focus sessions total' },
  { id: 'ELITE', name: 'ELITE', requirement: 'Reach Master Rank' }
];
