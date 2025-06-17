// app/products/ProductList.tsx
'use client';

import { trpc } from '@/utils/trpc';

export const ProductList = () => {
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.product.getAll.useQuery();

  const deleteProduct = trpc.product.delete.useMutation({
    onSuccess: () => utils.product.getAll.invalidate(),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="space-y-3 mt-4">
      {data?.map((product) => (
        <li key={product.id} className="border p-3 rounded flex justify-between">
          <div>
            <p className="font-bold">{product.name}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-600 font-semibold">₹{product.price}</p>
          </div>
          <button
            onClick={() => deleteProduct.mutate(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
