import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";

export const buscarTodasPautasUsuarioLogadoService= async (token: string, categoria:string)=>{
    const resposta = await api.get<RespostaPautaDados[]>(`/pauta/usuarioLogado?categoria=${categoria}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta.data;
}
