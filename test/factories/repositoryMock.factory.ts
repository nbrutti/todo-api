import { Repository } from 'typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<T>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }),
);
