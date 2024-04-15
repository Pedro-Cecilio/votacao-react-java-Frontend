import { Categoria } from "../enums/categoria";

export interface CriarPautaDados{
    assunto: string;
    categoria: Categoria
}

export interface RespostaPautaDados{
    id: number;
    assunto: string;
    categoria: Categoria;
    usuario_id: number;
}