import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";

export const buscarPautaPorIdService = async (pautaId: string) => {
    const resposta = await api.get<RespostaPautaDados>(`/pauta/${pautaId}`);
    return resposta;
}
