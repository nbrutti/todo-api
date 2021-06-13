import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrmConfig } from './configs/orm.config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: OrmConfig,
      inject: [ConfigService],
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
