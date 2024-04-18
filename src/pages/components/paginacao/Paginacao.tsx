import { Flex } from "@chakra-ui/react";
import Botao from "../botao/Botao";
interface PaginacaoProps {
    readonly paginaAtual: number;
    readonly totalPaginas: number;
    readonly controlarPaginaAtual: (paginaAtual: number) => void;
}
function Paginacao({ paginaAtual, totalPaginas, controlarPaginaAtual }: PaginacaoProps) {
    const paginaAnterior = () => {
        if (paginaAtual > 0) {
            controlarPaginaAtual(paginaAtual - 1);
        }
    };

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas - 1) {
            controlarPaginaAtual(paginaAtual + 1);
        }
    };

    return (

        <Flex justifyContent="center" gap={8}>
            {paginaAtual > 0 && (
                <Botao
                    onClick={paginaAnterior}
                    texto="Anterior"
                    tamanho={"sm"}
                />
            )}
            {paginaAtual < totalPaginas - 1 && (
                <Botao
                    onClick={proximaPagina}
                    texto="Próxima"
                    tamanho={"sm"}
                />
            )}
        </Flex>

    );
}

export default Paginacao;