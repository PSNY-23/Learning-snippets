import { trpc } from "./main";
import { useState } from "react";

function App() {
  const todos = trpc.todo.getAll.useQuery();
  const utils = trpc.useUtils();
  const addTodo = trpc.todo.add.useMutation({
    onSuccess: () => utils.todo.getAll.invalidate(),
  });
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate(); // refetch the list after deletion
    },
  });
  const [text, setText] = useState("");

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>tRPC Todo App</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            addTodo.mutate(text);
            setText("");
          }}
          className='flex gap-2'
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='flex-1 px-3 py-2 border rounded'
            placeholder='Add new todo'
          />
          <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Add
          </button>
        </form>

        <ul className='mt-6 space-y-2'>
          {todos.data?.map((todo) => (
            <li key={todo.id} className='p-3 bg-gray-50 border rounded flex justify-between'>
              <span>{todo.id}</span>
              <span>{todo.text}</span>
              <button className="text-red-500" onClick={() => deleteTodo.mutate(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
