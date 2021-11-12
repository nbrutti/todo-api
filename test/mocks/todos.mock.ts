import { Todo } from '../../src/todos/entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';

const now = new Date();

export const mockedId = uuidv4();

export const allTodos: Todo[] = [
  {
    id: uuidv4(),
    description: 'sample task 1',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    description: 'sample task 2',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    description: 'sample task 3',
    completed: true,
    createdAt: now,
    updatedAt: now,
  },
];
