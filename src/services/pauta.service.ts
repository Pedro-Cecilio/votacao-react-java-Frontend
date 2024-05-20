import { api } from "../lib/api"
import { CriarPautaDados, DetalhesPautaDados, RespostaPautaDados } from "../models/pautaModels";

export const criarPautaService = async (
    assunto: string,
    categoria: string,
    token: string
) => {
    const dadosPauta: CriarPautaDados = {
        assunto, 
        categoria
    }
    const response = await api.post<RespostaPautaDados>("/pauta", dadosPauta, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export const buscarPautaPorIdService = async (pautaId: string) => {
    const resposta = await api.get<RespostaPautaDados>(`/pauta/${pautaId}`);
    return resposta.data;
}

export const buscarTodasPautasAtivasService = async (token: string, categoria:string)=>{
    const resposta = await api.get<RespostaPautaDados[]>(`/pauta/ativas?categoria=${categoria}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta.data;
}

export const buscarTodasPautasUsuarioLogadoService= async (token: string, categoria:string)=>{
    const resposta = await api.get<RespostaPautaDados[]>(`/pauta/usuarioLogado?categoria=${categoria}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta.data;
}

export const buscarDetalhesPautaService = async (token: string, pautaId: string) => {
    const resposta = await api.get<DetalhesPautaDados>(`/pauta/detalhes/${pautaId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta.data;
}