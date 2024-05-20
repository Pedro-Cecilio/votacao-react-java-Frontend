import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetalhesPautaDados } from "../../models/pautaModels";
import { useTokenLocalStorage } from "../../hooks/useTokenLocalStorage";
import { Flex, Text, Divider, Card, CardHeader, Heading, CardBody, Badge, CardFooter, Image } from "@chakra-ui/react";
import Botao from "../components/botao/Botao";
import { AxiosError } from "axios";
import conteudoNaoEncontrado from "../../assets/conteudoNaoEncontrado.svg"
import { StatusSessaoVotacao } from "../../models/sessaoVotacaoModels";
import { buscarDetalhesPautaService } from "../../services/buscarDetalhesPauta.service";

const Detalhes = () => {
    const { id: pautaId } = useParams();
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const [dados, setDados] = useState<DetalhesPautaDados | null>(null);
    const [buscaConcluida, setBuscaConcluida] = useState<boolean>(false);
    const [paginaCarregada, setPaginaCarregada] = useState<boolean>(false);


    const navigate = useNavigate();


    const buscarDados = async () => {
        try {
            const token = obterTokenDoLocalStorage();
            const resposta = await buscarDetalhesPautaService(token, pautaId!);
            setDados(resposta);
            setBuscaConcluida(true);
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.response?.status == 404) {
                setBuscaConcluida(true);
            }
        }
    };


    useEffect(() => {
        buscarDados();
    }, [pautaId]);

    useEffect(() => {
        if (buscaConcluida) {
            setPaginaCarregada(true);
        }
    }, [buscaConcluida]);

    if (!dados && paginaCarregada) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Image src={conteudoNaoEncontrado} w={{ base: "60%", md: "50%", lg: "40%" }} />

            </Flex>
        );
    }

    return dados && (
        <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Card minW='md'>
                <CardHeader>
                    <Heading as="h1" size="lg">
                        Detalhes da Pauta
                    </Heading>
                    <Divider mt="4" />
                </CardHeader>
                <CardBody>
                    <Flex flexDirection={"column"} gap={3}>
                        <Text data-testid={"assunto-pauta"}>
                            <strong>Assunto:</strong> {dados.dadosPauta.assunto}
                        </Text>
                        <Text data-testid={"categoria-pauta"}>
                            <strong>Categoria:</strong>{" "}
                            {dados.dadosPauta.categoria}
                        </Text>
                        <Text data-testid={"criador-pauta"}>
                            <strong>Criador:</strong> {dados.dadosPauta.usuario.nome} {dados.dadosPauta.usuario.sobrenome}
                        </Text>

                        <Text data-testid={"votosPositivos-pauta"}>
                            <strong>Votos positivos:</strong> {dados.dadosPauta.sessaoVotacao?.votosPositivos}
                        </Text>
                        <Text data-testid={"votosNegativos-pauta"}>
                            <strong>Votos negativos:</strong> {dados.dadosPauta.sessaoVotacao?.votosNegativos}
                        </Text>

                        <Text data-testid={"status-pauta"}>
                            <strong>Status:</strong>{" "}
                            {dados.status === StatusSessaoVotacao.APROVADA && (
                                <Badge colorScheme="green">Aprovada</Badge>
                            )}
                            {dados.status === StatusSessaoVotacao.REPROVADA && (
                                <Badge colorScheme="red">Reprovada</Badge>
                            )}
                            {dados.status !== StatusSessaoVotacao.APROVADA &&
                                dados.status !== StatusSessaoVotacao.REPROVADA && (
                                    <Badge colorScheme="yellow">Em andamento</Badge>
                                )}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter>
                    <Flex >
                        <Botao testid="retornar-pauta" onClick={() => navigate("/minhasPautas")} tamanho={'md'} texto="Retornar" />
                    </Flex>
                </CardFooter>
            </Card>
        </Flex>
    )


};

export default Detalhes;
