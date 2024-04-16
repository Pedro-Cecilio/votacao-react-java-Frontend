import { useEffect, useState } from "react";
import { useTokenLocalStorage } from "../../hooks/useTokenLocalStorage";
import { RespostaPautaDados } from "../../models/pautaModels";
import CardPauta from "./components/cardPauta/CardPauta";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Paginacao from "./components/paginacao/Paginacao";
import Filtro, { InputsFiltro } from "./components/filtro/Filtro";
import { SubmitErrorHandler } from "react-hook-form";
import { useBuscarTodasPautas } from "../../hooks/useBuscarTodasPautas";

const Pautas = () => {
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const { buscarTodasPautas } = useBuscarTodasPautas();
    const token = obterTokenDoLocalStorage();
    const [pautas, setPautas] = useState<RespostaPautaDados[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const itensPorPagina = 6;
    const quantidadeDePaginas = Math.ceil(pautas.length / itensPorPagina);

    useEffect(() => {
        const buscarPautas = async () => {
            const response = await buscarTodasPautas(token)
            setPautas(response.data);
        };
        buscarPautas();
    }, [token]);

    const controlarPaginaAtual = (selected: number) => {
        setPaginaAtual(selected);
    };

    const renderizarPautas = () => {
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
    const onSubmitFiltro = ({assunto, categoria}:InputsFiltro) => {
        console.log(assunto);
        console.log(categoria);
    }
    const onError: SubmitErrorHandler<InputsFiltro> = (error) => {
        console.log(error.categoria);
    }
    return (
        <>
            <Flex p={quantidadeDePaginas > 0 ? 5 : 4} justifyContent={"center"} position={"relative"}>
                <Box>
                    <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
                </Box>
                <Box position={"absolute"} right={5} top={"50%"} transform={"translateY(-50%)"}>
                    <Filtro onSubmit={onSubmitFiltro} onError={onError}/>
                </Box>
            </Flex>
            <Grid gap={8} m={4} p={8} templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} justifyContent={"center"} justifyItems={"center"} alignItems={"center"}>
                {renderizarPautas()}
            </Grid>
            <Box p={4}>
                <Paginacao paginaAtual={paginaAtual} totalPaginas={quantidadeDePaginas} controlarPaginaAtual={controlarPaginaAtual} />
            </Box>
        </>
    );
};



export default Pautas;
