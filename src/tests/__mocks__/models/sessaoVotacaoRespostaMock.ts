import { SessaoVotacaoResposta } from "../../../models/sessaoVotacaoModels";

export const sessaoVotacaoRespostaMock = (): SessaoVotacaoResposta => {
    const dataAbertura = new Date();
    const dataFechamento = new Date();
    dataFechamento.setMinutes(dataAbertura.getMinutes() + 10);
    const resposta: SessaoVotacaoResposta = {
        id: 1,
        pauta_id: 1,
        sessaoAtiva: true,
        votosPositivos: 0,
        votosNegativos: 0,
        dataAbertura: dataAbertura.toISOString(),
        dataFechamento: dataFechamento.toISOString()
    }
    return resposta;
}