import { Request, Response } from "express";    
import { Item } from "./interfaces";
import { validatorCreateItem, validatorUpdateItem } from "./validators";

const items : Item[] = [
    { id: 1, name: 'user1', description: 'user1@example.com' }
]; 

export const getItems = (req: Request, res: Response)=> {
    res.json(items);
};

export const createItem = (req: Request, res: Response) => {
    try {
        const errors = validatorCreateItem(req.body);
        if(errors.length > 0){
            return res.status(400).json({errors});
        }

        const newItem: Item ={
            id: items.length + 1,
            name : req.body.name,
            description: req.body.description
        };
        items.push(newItem);
        res.status(201).json(newItem);

    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"});
    }
    
}
export const updateItem = (req: Request, res: Response) =>{
    try {
        const errors = validatorUpdateItem(req.body);
        
        if(errors.length>0){
            return res.status(400).json({errors});
        } 

        const id = Number(req.params.id);
        const itemIndex = items.findIndex(item => item.id === id);

        if(itemIndex === -1){
            return res.status(404).json({ message: "Item no encontrado"});
        }
        
        const { name, description } = req.body;

        if(name !== undefined){
            items[itemIndex].name = name;
        } 

        if(description !== undefined) {
            items[itemIndex].description = description;
        }

        res.json(items[itemIndex]);

    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"});
    }

}
export const deleteItem = (req: Request, res: Response) =>{
    try {
        const id = Number(req.params.id);
        const itemIndex = items.findIndex(item => item.id === id);
        
        if(itemIndex === -1)
            return res.status(404).json({message: "Item no encontrado"});
        
        const deleted = items.splice(itemIndex, 1)[0];
        res.status(200).json(deleted);

    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"});
    }

}
