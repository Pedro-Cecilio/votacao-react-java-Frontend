import { api } from "../lib/api"
import { DetalhesPautaDados } from "../models/pautaModels";

export const buscarDetalhesPautaService = async (token: string, pautaId: string) => {
    const resposta = await api.get<DetalhesPautaDados>(`/pauta/detalhes/${pautaId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
