import {prisma} from "./lib/prisma.js";

export const findAll = async () => {
    return await prisma.item.findMany();
}

export const create = async (name: string, description: string) => {
    return await prisma.item.create({
        data: {name, description}
    });
};

export const update = async (id: number, data: {name?: string; description?: string}) => {
    try {
        return await prisma.item.update({
            where: {id},
            data
    });  
    } catch (error:any) {
        // P2025 es el código de Prisma para "Record to update not found"
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export const remove = async (id: number) => {
    try {
        return await prisma.item.delete({
            where: {id}
        });
    } catch (error:any) {
        if (error.code === 'P2025') return null; // Item no encontrado
        throw error;
    }
    
};