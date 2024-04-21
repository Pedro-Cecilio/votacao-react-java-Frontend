import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { RespostaPautaDados } from "../../../models/pautaModels";
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore";
import MenuCardPauta from "../menuCardPauta/menuCardPauta";

import PopoverTotalVotos from "../popoverTotalVotos/PopoverTotalVotos";
import { useTokenLocalStorage } from "../../../hooks/useTokenLocalStorage";
import { useInserirVoto } from "../../../hooks/useInserirVoto";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";
import { TipoDeVoto } from "../../../enums/tipoDeVoto";
import { AxiosError } from "axios";
interface CardPautaProps {
    respostaPautaDados: RespostaPautaDados,
    callBackAoVotar: ()=> void;
}
const CardPauta = ({ respostaPautaDados: dados, callBackAoVotar }: CardPautaProps) => {
    const { id: idUsuarioLogado } = useDadosUsuarioStore();
    const usuarioEstaLogadoEAdmin = idUsuarioLogado == dados.usuario.id && dados.usuario.admin;
    const { obterTokenDoLocalStorage } = useTokenLocalStorage()
    const { inserirVoto } = useInserirVoto()
    const { toastSucesso, toastErro } = useToastPersonalizado()

    const votar = async (tipoDeVoto: TipoDeVoto) => {
        try {
            const token = obterTokenDoLocalStorage();
            await inserirVoto(dados.id, tipoDeVoto, token);
            toastSucesso("Voto inserido com sucesso")
            callBackAoVotar();
        }catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem);
        }
    }
 
    return (
        <Card w={"300px"} h={"350px"} id={dados.id.toString()}>
            <CardHeader>
                <Flex flexWrap='wrap' flexDirection={"column"}>
                    <Flex alignItems='center'>
                        <Flex flex={1} gap='2' alignItems='center'>
                            <Avatar name={`${dados.usuario.nome} ${dados.usuario.sobrenome}`} src='https://bit.ly/broken-link' bg={"gray.700"} color={"white"} />

                            <Box>
                                <Heading size='sm'>{`${dados.usuario.nome} ${dados.usuario.sobrenome}`}</Heading>
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
                        <Text fontSize={"small"} fontWeight={"700"} >{dados.categoria}</Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody display={"flex"} justifyContent={"center"} fontWeight={'bold'}>
                <Text fontSize="lg" fontWeight="bold" >
                    {dados.assunto}
                </Text>
            </CardBody>
            <CardFooter flexDirection={"column"}>
                {
                    idUsuarioLogado !== dados.usuario.id &&
                    <Flex w={"100%"}>
                        <Button flex='1' variant='ghost' colorScheme="whatsapp" onClick={()=>votar(TipoDeVoto.VOTO_POSITIVO)}>
                            Sim
                        </Button>
                        <Button flex='1' variant='ghost' colorScheme="red" onClick={()=>votar(TipoDeVoto.VOTO_NEGATIVO)}>
                            Não
                        </Button>
                    </Flex>
                }
                {
                    dados.sessaoVotacao != null &&
                    <PopoverTotalVotos votosPositivos={dados.sessaoVotacao.votosPositivos} votosNegativos={dados.sessaoVotacao.votosNegativos} />
                }
            </CardFooter>
        </Card>
    )
}



export default CardPauta;
