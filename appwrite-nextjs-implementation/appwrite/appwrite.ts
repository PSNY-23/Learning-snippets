import { Account, Client, Databases } from "appwrite";

export { ID } from 'appwrite';

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const database = new Databases(client);


const adminClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setDevKey(process.env.APPWRITE_API_KEY!)

export const adminDatabase = new Databases(adminClient)




