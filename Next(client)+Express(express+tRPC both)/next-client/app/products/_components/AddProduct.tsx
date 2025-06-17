'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const utils = trpc.useContext();
  const mutation = trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
      setName('');
      setDescription('');
      setPrice('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      description,
      price: parseFloat(price),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br />
      <button type="submit">Add Product</button>
    </form>
  );
};
