
export const validatorCreateItem = (body : {name?: string , description? : string}) : string[] => {
    const errors : string[] = [];
            if(body.name === undefined){
                errors.push("Nombre Requerido");
            }
            if(body.description === undefined){
                errors.push("Descripcion Requerida");
            }
    
    return errors;
}

export const validatorUpdateItem = (body :{name? : string, description?: string}) : string[] =>{
    const errors : string[] = [];
    if(body.name === undefined && body.description === undefined){
        errors.push("Debe enviar al menos un Nombre o Descripcion para actualizar");
    }
    return errors;
}