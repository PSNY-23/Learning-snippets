"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Models } from "appwrite";
import {DeleteIcon} from "lucide-react"


import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { productServices } from "@/appwrite/services/product";
import { database } from "@/appwrite/appwrite";

export default function DashboardPage() {
  const { user } = useUser();
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [products, setProducts ] = useState<Models.Document[]|null>(null);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    try {
      const newProduct = await productServices.create({ ...form, price });
      fetchProducts()
      setForm({ name: "", description: "", price: "" });
      console.log("New product added: ", newProduct);
    } catch (error: any) {
      console.log(error.message || "Error adding products");
    }
  };

  const fetchProducts = async() => {
    try {
      const res = await productServices.getAll();
      setProducts(res.documents) 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async(id:string) => {
      try {
        await productServices.remove(id)
        fetchProducts()
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className='min-h-screen bg-gray-100 p-4 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium'>Welcome, {user?.name} 💖</span>
          <Button variant='destructive'>Logout</Button>
        </div>
      </div>

      <div className='flex w-full justify-between gap-4'>
        {/* Form */}
        <Card className='w-96 h-96'>
          <CardHeader>
            <h3 className='text-lg font-semibold'>Add Product</h3>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' value={form.name} onChange={(e) => handleFormChange("name", e.target.value)} />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Input
                  id='description'
                  value={form.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id='price'
                  type='number'
                  value={form.price}
                  onChange={(e) => handleFormChange("price", e.target.value)}
                />
              </div>
              <Button type='submit'>Add Product</Button>
            </form>
          </CardContent>
        </Card>

        {/* Table */}
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold'>Products</h3>
            <Button variant='outline' onClick={() => fetchProducts()}>Refetch</Button>
          </div>

          <Card className="max-h-[800px] overflow-y-scroll">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products && products.map((product) => (
                    <TableRow key={product.$id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => handleDelete(product.$id)} className="text-red-400 cursor-pointer"/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
