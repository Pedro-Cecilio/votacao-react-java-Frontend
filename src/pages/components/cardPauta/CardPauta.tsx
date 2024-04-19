import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { RespostaPautaDados } from "../../../models/pautaModels";
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore";
import MenuAbrirVotacao from "../menuAbrirVotacao/menuAbrirVotacao";

import PopoverTotalVotos from "../popoverTotalVotos/PopoverTotalVotos";
const CardPauta = ({ id, assunto, categoria, usuario, sessaoVotacao }: RespostaPautaDados) => {
    const { id: idUsuarioLogado } = useDadosUsuarioStore();
    const usuarioEstaLogadoEAdmin = idUsuarioLogado == usuario.id && usuario.admin;


    return (
        <Card w={"300px"} h={"350px"} id={id.toString()}>
            <CardHeader>
                <Flex flexWrap='wrap' flexDirection={"column"}>
                    <Flex alignItems='center'>
                        <Flex flex={1} gap='2' alignItems='center'>
                            <Avatar name={`${usuario.nome} ${usuario.sobrenome}`} src='https://bit.ly/broken-link' bg={"gray.700"} color={"white"} />

                            <Box>
                                <Heading size='sm'>{`${usuario.nome} ${usuario.sobrenome}`}</Heading>
                                <Text fontStyle={"italic"}>Administrador</Text>
                            </Box>
                        </Flex>
                        {usuarioEstaLogadoEAdmin && (sessaoVotacao == null || sessaoVotacao.sessaoAtiva) &&
                            <Box>
                                <MenuAbrirVotacao pautaId={id} sessaoVotacao={sessaoVotacao} />
                            </Box>
                        }
                    </Flex>
                    <Flex alignItems='center' mt={4} ml={2}>
                        <Text fontSize={"small"} fontWeight={"700"} >{categoria}</Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody display={"flex"} justifyContent={"center"} fontWeight={'bold'}>
                <Text fontSize="lg" fontWeight="bold" >
                    {assunto}
                </Text>
            </CardBody>
            <CardFooter flexDirection={"column"}>
                {
                    idUsuarioLogado !== usuario.id &&
                    <Flex w={"100%"}>
                        <Button flex='1' variant='ghost' colorScheme="whatsapp">
                            Sim
                        </Button>
                        <Button flex='1' variant='ghost' colorScheme="red">
                            Não
                        </Button>
                    </Flex>
                }
                {
                    sessaoVotacao != null && 
                    <PopoverTotalVotos votosPositivos={sessaoVotacao.votosPositivos} votosNegativos={sessaoVotacao.votosNegativos} />
                }
            </CardFooter>
        </Card>
    )
}



export default CardPauta;
