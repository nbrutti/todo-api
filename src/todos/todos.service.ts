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
    private readonly todosRepository: Repository<Todo>,
  ) { }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      return await this.todosRepository.save(createTodoDto);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      return await this.todosRepository.find();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      return await this.todosRepository.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Partial<Todo>> {
    try {
      await this.todosRepository.update(id, updateTodoDto);
      return await this.todosRepository.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Partial<Todo>> {
    try {
      const data = await this.todosRepository.delete(id);
      return { ...data, id };
    } catch (err) {
      throw err;
    }
  }
}
