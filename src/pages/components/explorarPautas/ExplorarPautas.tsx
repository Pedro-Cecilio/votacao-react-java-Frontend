import { useEffect, useState } from "react";
import { useTokenLocalStorage } from "../../../hooks/useTokenLocalStorage";
import { RespostaPautaDados } from "../../../models/pautaModels";
import CardPauta from "../cardPauta/CardPauta";
import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import Paginacao from "../paginacao/Paginacao";
import Filtro, { InputsFiltro } from "../filtro/Filtro";
import { SubmitErrorHandler } from "react-hook-form";
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore";
import ModalNovaPauta from "../modalNovaPauta/ModalNovaPauta";
import Botao from "../botao/Botao";
import conteudoNaoEncontrado from "../../../assets/conteudoNaoEncontrado.svg"
import { AxiosError} from "axios";
import { useLocation } from 'react-router-dom';
import { TipoDeVoto } from "../../../enums/tipoDeVoto";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";
import { useInserirVoto } from "../../../hooks/useInserirVoto";

interface ExplorarPautasProps {
    metodoBuscarPautasBanco: (token: string, categoria: string) => Promise<RespostaPautaDados[]>
}

const ExplorarPautas = ({ metodoBuscarPautasBanco }: ExplorarPautasProps) => {
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const { admin } = useDadosUsuarioStore();
    const [modalNovaPautaAberto, setModalNovaPautaAberto] = useState(false);
    const token = obterTokenDoLocalStorage();
    const [pautas, setPautas] = useState<RespostaPautaDados[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const itensPorPagina = 6;
    const quantidadeDePaginas = Math.ceil(pautas.length / itensPorPagina);
    const [categoria, setCategoria] = useState<string>("");
    const [paginaCarregada, setPaginaCarregada] = useState(false);
    const [atualizarPagina, setAtualizarPagina] = useState(false);
    const [buscaConcluida, setBuscaConcluida] = useState(false);
    const { inserirVotoInterno } = useInserirVoto();
    const { toastSucesso, toastErro } = useToastPersonalizado()

    const rotaAtual: string = useLocation().pathname;
    useEffect(() => {
        const buscarPautas = async () => {
            const resposta = await metodoBuscarPautasBanco(token, categoria);
            setPautas(resposta);
            setBuscaConcluida(true);
        };
        buscarPautas();
    }, [token, categoria, atualizarPagina]);

    useEffect(() => {
        if (buscaConcluida) {
            setPaginaCarregada(true);
        }
    }, [buscaConcluida]);

    const mudarModalNovaPautaAberto = () => {
        setModalNovaPautaAberto(!modalNovaPautaAberto);
    }

    const controlarPaginaAtual = (selected: number) => {
        setPaginaAtual(selected);
    };

    const metodoParaVotarNaPauta = async (tipoDeVoto: TipoDeVoto, pautaId:number) => {
        try {
            const token = obterTokenDoLocalStorage();
            await inserirVotoInterno(pautaId, tipoDeVoto, token);
            toastSucesso("Voto inserido com sucesso")
            setAtualizarPagina(true);
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem);
        }
    }
    const renderizarPautasPorPagina = () => {
        const indexInicial = paginaAtual * itensPorPagina;
        const indexFinal = indexInicial + itensPorPagina;
        return pautas.slice(indexInicial, indexFinal).map(pauta => (
            <CardPauta
                key={pauta.id}
                respostaPautaDados={{
                    id: pauta.id,
                    assunto: pauta.assunto,
                    categoria: pauta.categoria,
                    usuario: pauta.usuario,
                    sessaoVotacao: pauta.sessaoVotacao
                }}
                metodoParaVotar={metodoParaVotarNaPauta}
            />
        ));
    };
    const onSubmitFiltro = async ({ categoria }: InputsFiltro) => {
        setCategoria(categoria);
    }
    const onError: SubmitErrorHandler<InputsFiltro> = (error) => {
        if(error.categoria?.message) return toastErro(error.categoria.message);
        else{
            toastErro("Houve um erro ao filtrar pautas.");
        }
    }

    return (
        <Flex flexDirection={"column"} h={"100%"} data-testid={"explorar-pautas"}>
            <Flex m={2} justifyContent={"space-between"}>
                {admin && rotaAtual == "/minhasPautas" && (
                    <Box>
                        <Botao testid={"botao-abrirModalNovaPauta"} onClick={mudarModalNovaPautaAberto} tamanho={'sm'} texto={"Criar nova pauta"} />
                    </Box>
                )}
                <Box>
                    <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
                </Box>
                <Box >
                    <Filtro onSubmit={onSubmitFiltro} onError={onError} />
                </Box>
            </Flex>
            <Grid gap={8} m={{ base: 2, sm: 4 }} p={{ base: 0, sm: 8 }} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} justifyItems={"center"} >
                {renderizarPautasPorPagina()}
            </Grid>


            {paginaCarregada && pautas.length == 0 &&
                <Flex justifyContent={"center"} h={"100%"}>
                    <Image src={conteudoNaoEncontrado} w={{ base: "60%", md: "50%", lg: "30%" }} />
                </Flex>
            }

            <Flex justifyContent={"center"} m={2} pl={10}>
                <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
            </Flex>
            <ModalNovaPauta aberto={modalNovaPautaAberto} fechar={mudarModalNovaPautaAberto} setAtualizarPagina={setAtualizarPagina} />
        </Flex>
    );
};



export default ExplorarPautas;
