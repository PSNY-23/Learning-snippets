// routers/todo.ts
import { z } from 'zod';
import { router, procedure } from '../trpc';

let todos = [
    { id: 1, text: 'Learn tRPC 1', done: false },
    { id: 2, text: 'Learn tRPC 2', done: false },
    { id: 3, text: 'Learn tRPC 3', done: false },
    { id: 4, text: 'Learn tRPC 4', done: false },
    { id: 5, text: 'Learn tRPC 5', done: false },
    { id: 6, text: 'Learn tRPC 6', done: false },
    { id: 7, text: 'Learn tRPC 7', done: false },
    { id: 8, text: 'Learn tRPC 8', done: false },
    { id: 9, text: 'Learn tRPC 9', done: false },
    { id: 10, text: 'Learn tRPC 10', done: false },
  ];

export const todoRouter = router({
  getAll: procedure.query(() => todos),

  add: procedure.input(z.string()).mutation(({ input }) => {
    const newTodo = { id: Date.now(), text: input, done: false };
    todos.push(newTodo);
    return newTodo;
  }),
  delete: procedure.input(z.number()).mutation(({ input }) => {
    const remainingTodos = todos.filter((todo) => todo.id !== input);
    return remainingTodos
  } ),

  toggle: procedure.input(z.number()).mutation(({ input }) => {
    const todo = todos.find((t) => t.id === input);
    if (todo) todo.done = !todo.done;
    return todo;
  }),
});
