interface SessaoVotacaoResposta {
    id: number;
    pauta_id: number;
    votosPositivos: number;
    votosNegativos: number;
    dataAbertura: string;
    dataFechamento: string;
}

interface AbrirSessaoVotacaoDados{
    pautaId:number
    minutos:number
}