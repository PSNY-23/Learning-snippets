// ✅ app/page.tsx
'use client'; // this is a client component

import { trpc } from '@/utils/trpc'; // trpc client
import { useState } from 'react'; // useState hook

export default function TodoPage() {
  const utils = trpc.useUtils(); // for cache invalidation after mutation
  const [title, setTitle] = useState(''); // state for input field

  const { data: todos = [] } = trpc.todo.getAll.useQuery(); // fetch all todos on mount

  const addTodo = trpc.todo.add.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate(); // refetch todos after adding
      setTitle(''); // clear input
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate(); // refetch todos after delete
    },
  });

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">My Todos</h1>

      <input
        className="border px-2 py-1 mr-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // update input on change
        placeholder="New todo"
      />
      <button onClick={() => addTodo.mutate({ title })}>Add</button> {/* add todo */}

      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            {todo.title}
            <button
              onClick={() => deleteTodo.mutate({ id: todo.id })} // delete todo
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
