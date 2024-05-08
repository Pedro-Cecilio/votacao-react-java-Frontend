import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { RespostaPautaDados } from "../../../models/pautaModels";
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore";
import MenuCardPauta from "../menuCardPauta/menuCardPauta";

import PopoverTotalVotos from "../popoverTotalVotos/PopoverTotalVotos";
import { TipoDeVoto } from "../../../enums/tipoDeVoto";
interface CardPautaProps {
    respostaPautaDados: RespostaPautaDados,
    metodoParaVotar: (tipoDeVoto: TipoDeVoto, pautaId: number) => Promise<void>;
    id: string;
}
const CardPauta = ({ respostaPautaDados: dados, metodoParaVotar: votar, id }: CardPautaProps) => {
    const { id: idUsuarioLogado } = useDadosUsuarioStore();
    const usuarioEstaLogadoEAdmin = idUsuarioLogado == dados.usuario.id && dados.usuario.admin;


    return (
        <Card w={"300px"} h={"350px"} data-testid={"card-pauta"} id={id}>
            <CardHeader>
                <Flex flexWrap='wrap' flexDirection={"column"}>
                    <Flex alignItems='center'>
                        <Flex flex={1} gap='2' alignItems='center'>
                            <Avatar name={`${dados.usuario.nome} ${dados.usuario.sobrenome}`} src='https://bit.ly/broken-link' bg={"gray.700"} color={"white"} />

                            <Box>
                                <Heading data-testid={`usuario-nome-${dados.id}`} size='sm'>{`${dados.usuario.nome} ${dados.usuario.sobrenome}`}</Heading>
                                <Text fontStyle={"italic"}>Administrador</Text>
                            </Box>
                        </Flex>
                        {usuarioEstaLogadoEAdmin &&
                            <Box>
                                <MenuCardPauta pautaId={dados.id} sessaoVotacao={dados.sessaoVotacao} />
                            </Box>
                        }
                    </Flex>
                    <Flex alignItems='center' mt={4} ml={2}>
                        <Text data-testid={`categoria-${dados.id}`} fontSize={"small"} fontWeight={"700"} >{dados.categoria}</Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody display={"flex"} justifyContent={"center"} fontWeight={'bold'}>
                <Text fontSize="lg" fontWeight="bold" data-testid={`assunto-${dados.id}`} >
                    {dados.assunto}
                </Text>
            </CardBody>
            <CardFooter flexDirection={"column"}>
                {
                    idUsuarioLogado !== dados.usuario.id &&
                    <Flex w={"100%"} data-testid={"botoes-votacao"}>
                        <Button flex='1' variant='ghost' colorScheme="whatsapp" onClick={() => votar(TipoDeVoto.VOTO_POSITIVO, dados.id)} data-testid={`botao-voto-positivo-${id}`}>
                            Sim
                        </Button>
                        <Button flex='1' variant='ghost' colorScheme="red" onClick={() => votar(TipoDeVoto.VOTO_NEGATIVO, dados.id)} data-testid={`botao-voto-negativo-${id}`}>
                            Não
                        </Button>
                    </Flex>
                }
                {
                    dados.sessaoVotacao != null &&
                    <PopoverTotalVotos votosPositivos={dados.sessaoVotacao.votosPositivos} votosNegativos={dados.sessaoVotacao.votosNegativos} idHtmlPauta={id} />
                }
            </CardFooter>
        </Card>
    )
}



export default CardPauta;
