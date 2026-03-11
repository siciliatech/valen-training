import { Request, Response } from "express";    
import * as ItemService from "./itemsService.js";

export const getItems = async (req: Request, res: Response)=> {
    try {
        const items = await ItemService.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los items" });
    }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const newItem = await ItemService.createItem(req.body)
        res.status(201).json(newItem);

    } catch (error: any) {
        if (error.type === "VALIDATION_ERROR") {
            return res.status(400).json({ message: "Error de validación", errors: error.details });
        }
        res.status(500).json({message: "Error interno del servidor"});
    }
    
}
export const updateItem = async (req: Request, res: Response) =>{
    try {
        const id = Number(req.params.id);
        const updatedItem = await ItemService.updateItem(id, req.body);
        res.status(201).json(updatedItem);
       
    } catch (error: any) {
        if(error.type === "VALIDATION_ERROR"){
            return res.status(400).json({ message: "Error de validación", errors: error.details})
        }
        if (error.type === "NOT_FOUND") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al actualizar" })
    }

}
export const deleteItem = async (req: Request, res: Response) =>{
    try {
        const id = Number(req.params.id);
        await ItemService.deleteItem(id);
        res.status(204).send();
    } catch (error: any) {
        if(error.type === "NOT_FOUND"){
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al eliminar" });
    }

}
