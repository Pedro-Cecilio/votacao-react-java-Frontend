interface SessaoVotacaoResposta {
    id: number;
    pauta_id: number;
    votosPositivos: number;
    votosNegativos: number;
    dataAbertura: string;
    dataFechamento: string;
    sessaoAtiva: boolean;
}

interface AbrirSessaoVotacaoDados{
    pautaId:number
    minutos:number
}