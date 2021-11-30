import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../src/todos/entities/todo.entity';
import { TodosController } from '../../src/todos/todos.controller';
import { TodosService } from '../../src/todos/todos.service';
import { serviceMockFactory } from '../factories/serviceMock.factory';
import { allTodos } from '../mocks/todos.mock';

describe('TodoController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodo: Todo = {
        id: uuidv4(),
        description: 'new task',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
      };
      jest.spyOn(service, 'create').mockResolvedValue(newTodo);
      await expect(
        controller.create({ description: 'new task' }),
      ).resolves.toEqual(newTodo);
      expect(service.create).toHaveBeenCalledWith({ description: 'new task' });
    });
  });

  describe('findAll', () => {
    it('should get a array of todos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(allTodos);
      await expect(controller.findAll()).resolves.toEqual(allTodos);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a todos object', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(allTodos[0]);
      await expect(controller.findOne(allTodos[0].id)).resolves.toEqual(
        allTodos[0],
      );
      expect(service.findOne).toHaveBeenCalledWith(allTodos[0].id);
    });
  });

  describe('update', () => {
    it('should be update todo', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(allTodos[0]);
      await expect(controller.update(uuidv4(), allTodos[0])).resolves.toEqual(
        allTodos[0],
      );
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(allTodos[0]);
      await expect(controller.remove(allTodos[0].id)).resolves.toEqual(
        allTodos[0],
      );
      expect(service.remove).toHaveBeenCalledWith(allTodos[0].id);
    });
  });
});
