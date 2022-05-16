import { Module } from '@nestjs/common';
import { ApiRepetitionApplicationModule } from '@voclearn/api-repetition-application';
import { ApiRepetitionInfrastructureModule } from '@voclearn/api-repetition-infrastructure';

@Module({
  imports: [
    ApiRepetitionApplicationModule.withInfrastructure([
      ApiRepetitionInfrastructureModule,
    ]),
  ],
  exports: [ApiRepetitionApplicationModule],
})
export class ApiRepetitionModule {}
