import { DynamicModule, Global, Module } from '@nestjs/common';
import { Knex, knex } from 'knex';

@Global()
@Module({})
export class KnexModule {
  static forRoot(config: Knex.Config): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: knex(config),
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}
