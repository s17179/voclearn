import {
  Learner,
  LearningSession,
  Partition,
} from '@voclearn/api-repetition-domain';
import { LearnerEntity } from './learner.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerMapper {
  map(entity: LearnerEntity): Learner {
    return new Learner(
      entity.id,
      new LearningSession(entity.currentSession),
      new Partition(entity.partitionSize)
    );
  }

  mapToEntity(learner: Learner): LearnerEntity {
    const learnerSnapshot = learner.getSnapshot();

    return new LearnerEntity(
      learnerSnapshot.id,
      learnerSnapshot.currentSession.toNumber(),
      learnerSnapshot.partition.getSize()
    );
  }
}
