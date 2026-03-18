import * as ItemRepository from "./itemsRepository.js";
import { validatorCreateItem, validatorUpdateItem } from "./validators.js";

export const getAllItems = async () => {
  return await ItemRepository.findAll();
};

export const createItem = async (data: { name: string; description: string }) => {
  
  const errors = validatorCreateItem(data);
  if (errors.length > 0) {
    throw { type: "VALIDATION_ERROR", details: errors };
  }

  return await ItemRepository.create(data.name, data.description);
};

export const updateItem = async (id: number, data: {name?: string; description?: string}) =>{
    const errors = validatorUpdateItem(data);
    if(errors.length > 0){
        throw { type: "VALIDATION_ERROR", details: errors};
    }
    const updatedItem = await ItemRepository.update(id,data);
    
    if (!updatedItem) {
        throw { type: "NOT_FOUND", message: `Item con ID ${id} no encontrado` };
    }

    return updatedItem;
};

export const deleteItem = async (id: number) => {
    const deletedItem = await ItemRepository.remove(id);
    if(!deletedItem){
        throw{ type: "NOT_FOUND", message: `Item con ID ${id} no encontrado`};
    }
    return deletedItem;
};