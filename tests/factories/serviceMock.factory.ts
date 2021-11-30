import { TodosService } from '../../src/todos/todos.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<T>;
};

export const serviceMockFactory: () => MockType<TodosService> = jest.fn(() => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));
