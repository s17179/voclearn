import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { Config } from './config-provider';

@Injectable()
export class ConfigValidator {
  static validate(config: Config): void {
    const result: ValidationError[] = validateSync(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (result.length > 0) {
      throw new Error(
        `Missing config properties for ${
          config.constructor.name
        }: ${ConfigValidator.formatErrorMessage(result)}`
      );
    }
  }

  private static formatErrorMessage(
    validationErrors: ValidationError[]
  ): string {
    return JSON.stringify(
      validationErrors.map((validationError) => ({
        property: validationError.property,
        constraints: validationError.constraints,
      })),
      null,
      2
    );
  }
}
