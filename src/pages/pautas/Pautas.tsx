import { useEffect, useState } from "react";
import { useTokenLocalStorage } from "../../hooks/useTokenLocalStorage";
import { RespostaPautaDados } from "../../models/pautaModels";
import CardPauta from "./components/cardPauta/CardPauta";
import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import Paginacao from "./components/paginacao/Paginacao";
import Filtro, { InputsFiltro } from "./components/filtro/Filtro";
import { SubmitErrorHandler } from "react-hook-form";
import { useBuscarTodasPautas } from "../../hooks/useBuscarTodasPautas";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import ModalNovaPauta from "./components/modalNovaPauta/ModalNovaPauta";
import Botao from "../components/botao/Botao";
import conteudoNaoEncontrado from "../../assets/conteudoNaoEncontrado.svg"


const Pautas = () => {
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const { buscarTodasPautas } = useBuscarTodasPautas();
    const { admin } = useDadosUsuarioStore();
    const [modalNovaPautaAberto, setModalNovaPautaAberto] = useState(false);
    const token = obterTokenDoLocalStorage();
    const [pautas, setPautas] = useState<RespostaPautaDados[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const itensPorPagina = 6;
    const quantidadeDePaginas = Math.ceil(pautas.length / itensPorPagina);
    const [categoria, setCategoria] = useState<string>("");
    const [paginaCarregada, setPaginaCarregada] = useState(false)
    const [novaPautaAdicionada, setNovaPautaAdicionada] = useState(false)


    useEffect(() => {
        const buscarPautas = async () => {
            const response = await buscarTodasPautas(token, categoria);
            setPautas(response.data);
        };
        buscarPautas();
        window.addEventListener('load', () => {
            setPaginaCarregada(true);
          });
          return () => {
            window.removeEventListener('load', () => {});
          };
    }, [token, categoria, novaPautaAdicionada]);

    const mudarModalNovaPautaAberto = () => {
        setModalNovaPautaAberto(!modalNovaPautaAberto);
    }

    const controlarPaginaAtual = (selected: number) => {
        setPaginaAtual(selected);
    };

    const renderizarPautasPorPagina = () => {
        const indexInicial = paginaAtual * itensPorPagina;
        const indexFinal = indexInicial + itensPorPagina;
        return pautas.slice(indexInicial, indexFinal).map(pauta => (
            <CardPauta
                key={pauta.id}
                id={pauta.id}
                assunto={pauta.assunto}
                categoria={pauta.categoria}
                usuario={pauta.usuario}
                sessaoVotacao={pauta.sessaoVotacao}
            />
        ));
    };
    const onSubmitFiltro = async ({ categoria }: InputsFiltro) => {
        setCategoria(categoria);
    }
    const onError: SubmitErrorHandler<InputsFiltro> = (error) => {
        console.log(error.categoria);
    }
    return (
        <Flex flexDirection={"column"} h={"100%"}>
            <Flex m={2} justifyContent={"space-between"}>
                {admin && (
                    <Box>
                        <Botao onClick={mudarModalNovaPautaAberto} tamanho={'sm'} texto={"Criar nova pauta"} />
                    </Box>
                )}
                <Box>
                    <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
                </Box>
                <Box >
                    <Filtro onSubmit={onSubmitFiltro} onError={onError} />
                </Box>
            </Flex>
            <Grid gap={8} m={4} p={8} templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}  justifyItems={"center"} >
                {renderizarPautasPorPagina()}
            </Grid>
            <Flex justifyContent={"Center"} flex={1}>

                {pautas.length == 0 && paginaCarregada &&
                    <Image src={conteudoNaoEncontrado} w={{base:"60%", md:"50%", lg:"40%"}} />
                }

            </Flex>

            <Flex justifyContent={"center"} m={2} pl={10}>
                <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
            </Flex>
            <ModalNovaPauta aberto={modalNovaPautaAberto} fechar={mudarModalNovaPautaAberto} setNovaPautaAdicionada={setNovaPautaAdicionada} />
        </Flex>
    );
};



export default Pautas;
