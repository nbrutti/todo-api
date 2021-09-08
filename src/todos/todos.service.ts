import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      return await this.todoRepository.save(createTodoDto);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.find();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      return await this.todoRepository.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Partial<Todo>> {
    try {
      await this.todoRepository.update(id, updateTodoDto);
      return await this.todoRepository.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Partial<Todo>> {
    try {
      const data = await this.todoRepository.delete(id);
      return { ...data, id };
    } catch (err) {
      throw err;
    }
  }
}
