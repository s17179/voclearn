import { Card } from './card';
import { Learner } from './learner';
import { LearnerId } from './learner-id';
import { LearningSession } from './learning-session';
import { Partition } from './partition';
import { SessionDeck } from './session-deck';

export interface RepetitionSnapshot {
  learner: Learner;
  card: Card;
}

export interface LearnerSnapshot {
  id: LearnerId;
  currentSession: LearningSession;
  partition: Partition;
}

export interface SessionDeckCardSnapshot {
  sessionDeck: SessionDeck;
}

export interface RetiredDeckCardSnapshot {
  retiredInSession: LearningSession;
}
