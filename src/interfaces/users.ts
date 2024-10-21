
export interface Users{
    id:number;
    email:string;
    password:string;
    isActive: boolean;
}

export interface UserNuevo{
    nombre:string;
    email:string;
    password:string;
    imagen:string;
    isActive: boolean;
}