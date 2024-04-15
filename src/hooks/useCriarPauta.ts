import { Categoria } from "../enums/categoria"
import { CriarPautaDados } from "../models/pautaModels"
import { criarPautaService } from "../services/criarPauta.service"

export const useCriarPauta = () => {
    const criarPauta = async (assunto: string, categoria: Categoria, token:string)=>{
        const criarPautaDados: CriarPautaDados = {
            assunto, 
            categoria
        }
        
        const resposta = await criarPautaService(criarPautaDados, token);
        return resposta;
    }

    return {
        criarPauta
    }
}