import { database } from "../appwrite";
import { ID } from "../appwrite";
import {constants} from "../constants"

const dbID = constants.dbID
const collectionID = constants.collection.productID



// add a product
const create = async (data) => {
  return await database.createDocument(dbID, collectionID, ID.unique(), data);
};

const getAll = async () => {
  return await database.listDocuments(dbID, collectionID);
};

const getById = async (id: string) => {
  return await database.getDocument(dbID, collectionID, id);
};

const update = async (id: string, data: any) => {
  return await database.updateDocument(dbID, collectionID, id, data);
};

const remove = async (id: string) => {
  return await database.deleteDocument(dbID, collectionID, id);
};

export const productServices = {
  getAll,
  create,
  getById,
  update,
  remove,
};
