import { Router } from "express";  
import { getItems, createItem, updateItem, deleteItem } from "./itemsController";

const router = Router();
router.get('/items', getItems);
router.post('/items', createItem);
router.patch('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
export default router;