// app/products/page.tsx
import { AddProduct } from './_components/AddProduct';
import { ProductList } from './_components/ProductList';

export default function ProductPage() {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
}
