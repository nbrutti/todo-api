import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from '../../src/todos/dto/create-todo.dto';
import { UpdateTodoDto } from '../../src/todos/dto/update-todo.dto';
import { Todo } from '../../src/todos/entities/todo.entity';
import { TodosService } from '../../src/todos/todos.service';
import { repositoryMockFactory } from '../factories/repositoryMock.factory';
import { allTodos, mockedId } from '../mocks/todos.mock';

describe('TodosService', () => {
  let todosService: TodosService;
  let todosRepository: Repository<Todo>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    todosRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
    expect(todosRepository).toBeDefined();
  });

  describe('create(todo)', () => {
    it('when task is valid should be returned a new registry', () => {
      const body: CreateTodoDto = { description: 'sample task 1' };
      jest.spyOn(todosRepository, 'save').mockResolvedValue(allTodos[0]);
      expect(todosService.create(body)).resolves.toStrictEqual(allTodos[0]);
      expect(todosRepository.save).toHaveBeenCalledWith(body);
    });

    it('when task is invalid should be throwed a exception', () => {
      const exception = new InternalServerErrorException();
      const invalidBody = { description: 'invalid task' };
      jest.spyOn(todosRepository, 'save').mockRejectedValue(exception);
      expect(todosService.create(invalidBody)).rejects.toThrow(exception);
      expect(todosRepository.save).toHaveBeenCalledWith(invalidBody);
    });
  });

  describe('findAll()', () => {
    it('should be returned all todos', () => {
      jest.spyOn(todosRepository, 'find').mockResolvedValue(allTodos);
      expect(todosService.findAll()).resolves.toStrictEqual(allTodos);
      expect(todosRepository.find).toHaveBeenCalled();
    });

    it('when errors occurs should be throwed a exception', () => {
      const exception = new InternalServerErrorException();
      jest.spyOn(todosRepository, 'find').mockRejectedValue(exception);
      expect(todosService.findAll()).rejects.toThrow(exception);
      expect(todosRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne(id)', () => {
    it('if there is a task with id it must be returned', () => {
      jest
        .spyOn(todosRepository, 'findOneOrFail')
        .mockResolvedValue(allTodos[0]);

      expect(todosService.findOne(mockedId)).resolves.toStrictEqual(
        allTodos[0],
      );
      expect(todosRepository.findOneOrFail).toHaveBeenCalledWith(mockedId);
    });

    it('if it does not find a task with id it is expected to return error 500', () => {
      const exception = new InternalServerErrorException();
      jest.spyOn(todosRepository, 'findOneOrFail').mockRejectedValue(exception);
      expect(todosService.findOne(mockedId)).rejects.toThrow(exception);
      expect(todosRepository.findOneOrFail).toHaveBeenCalledWith(mockedId);
    });
  });

  describe('update(id, todo)', () => {
    it('should be returned a updated task', () => {
      const body: UpdateTodoDto = { description: 'updated description' };
      jest
        .spyOn(todosRepository, 'update')
        .mockResolvedValue({ affected: 1 } as UpdateResult);

      jest
        .spyOn(todosRepository, 'findOneOrFail')
        .mockResolvedValue({ ...allTodos[0], ...body });

      expect(todosService.update(mockedId, body)).resolves.toStrictEqual({
        ...allTodos[0],
        ...body,
      });
      expect(todosRepository.update).toHaveBeenCalledWith(mockedId, body);
    });

    it('if it does not find a task with id it is expected to return error 500', () => {
      const exception = new InternalServerErrorException();
      const body: UpdateTodoDto = { description: 'updated description' };
      jest.spyOn(todosRepository, 'update').mockRejectedValue(exception);
      expect(todosService.update(mockedId, body)).rejects.toThrow(exception);
      expect(todosRepository.update).toHaveBeenCalledWith(mockedId, body);
    });
  });

  describe('remove(id)', () => {
    it('should be returned a deleted task', () => {
      jest
        .spyOn(todosRepository, 'delete')
        .mockResolvedValue(allTodos[0] as any as DeleteResult);

      expect(todosService.remove(mockedId)).resolves.toStrictEqual({
        ...allTodos[0],
        ...{ id: mockedId },
      });
      expect(todosRepository.delete).toHaveBeenCalledWith(mockedId);
    });

    it('if it does not find a task with id it is expected to return error 500', () => {
      const exception = new InternalServerErrorException();
      jest.spyOn(todosRepository, 'delete').mockRejectedValue(exception);
      expect(todosService.remove(mockedId)).rejects.toThrow(exception);
      expect(todosRepository.delete).toHaveBeenCalledWith(mockedId);
    });
  });
});
