import { Categoria } from "../../enums/categoria";
import * as useBuscarDetalhesPauta from "../../hooks/useBuscarDetalhesPauta"
import { DetalhesPautaDados } from "../../models/pautaModels";
import { StatusSessaoVotacao } from "../../models/sessaoVotacaoModels";


export const useDetalhesPautaMock = () => {
    const dataAbertura = new Date();
    const dataFechamento = new Date();
    dataFechamento.setMinutes(dataAbertura.getMinutes() + 10);

    const detalhesPautaDados: DetalhesPautaDados = {
        dadosPauta: {
            id: 1,
            assunto: "Você sabe dirigir?",
            categoria: Categoria.TRANSPORTE,
            usuario: {
                id: 1,
                nome: "João",
                sobrenome: "Silva",
                cpf: "12345678900",
                admin: false
            },
            sessaoVotacao: {
                id: 1,
                pauta_id: 1,
                sessaoAtiva: true,
                votosPositivos: 0,
                votosNegativos: 0,
                dataAbertura: dataAbertura.toISOString(),
                dataFechamento: dataFechamento.toISOString()
            },
        },
        status: StatusSessaoVotacao.EM_ANDAMENTO
    }
    const useBuscarDetalhesPautaMock = (jestfn: jest.Mock<any, any, any>) => {
        jest.spyOn(useBuscarDetalhesPauta, 'useBuscarDetalhesPauta').mockReturnValue({
            buscarDetalhesPauta: jestfn.mockResolvedValue(detalhesPautaDados)
        });
    }
    
    return {
        useBuscarDetalhesPautaMock,
        detalhesPautaDados
    }

}