import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TodosController],
  providers: [TodosService, ConfigService],
})
export class TodosModule {}
