import { LearnerId } from './learner-id';
import { LearningSession } from './learning-session';

export class LearnerSessionMovedEvent {
  constructor(
    readonly learnerId: LearnerId,
    readonly session: LearningSession
  ) {}
}
