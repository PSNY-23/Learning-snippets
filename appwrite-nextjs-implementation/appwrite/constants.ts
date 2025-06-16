// constants/appwrite.ts
export const constants = {
  dbID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  collection: {
    productID: process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_ID!,
    cartID: process.env.NEXT_PUBLIC_APPWRITE_CART_ID!,
  },
};
