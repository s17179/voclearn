import { LearnerId } from './learner-id';

export class LearnerResetEvent {
  constructor(readonly learnerId: LearnerId) {}
}
