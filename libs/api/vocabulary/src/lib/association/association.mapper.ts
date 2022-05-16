import { Injectable } from '@nestjs/common';
import { Association } from './dto/association';
import { AssociationEntity } from './association.entity';

@Injectable()
export class AssociationMapper {
  map(entity: AssociationEntity): Association {
    return new Association(entity.id, entity.note);
  }
}
