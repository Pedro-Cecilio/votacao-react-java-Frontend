import { DetalhesPautaDados } from "../../../models/pautaModels";
import { StatusSessaoVotacao } from "../../../models/sessaoVotacaoModels";
import { respostaPautaDadosMock } from "./respostaPautaDadosMocks";

export const detalhesPautaDadosMock = (): DetalhesPautaDados => {
  
    const resposta: DetalhesPautaDados = {
        dadosPauta: respostaPautaDadosMock(),
        status: StatusSessaoVotacao.EM_ANDAMENTO
    }
    return resposta;
}
