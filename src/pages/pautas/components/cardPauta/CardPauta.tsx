import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { RespostaPautaDados } from "../../../../models/pautaModels";

const CardPauta = ({ id, assunto, categoria, usuario, sessaoVotacao}: RespostaPautaDados) => {

    return (
        <Card w={"300px"} id={id.toString()}>
            <CardHeader>
                <Flex flexWrap='wrap' flexDirection={"column"}>
                    <Flex flex='1' gap='4' alignItems='center'>
                        <Avatar name={usuario.nome} src='https://bit.ly/broken-link' bg={"gray.700"} color={"white"} />

                        <Box>
                            <Heading size='sm'>{usuario.nome}</Heading>
                            <Text fontStyle={"italic"}>Administrador</Text>
                        </Box>
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
            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1' variant='ghost' colorScheme="whatsapp">
                    Sim
                </Button>
                <Button flex='1' variant='ghost' colorScheme="red">
                    Não
                </Button>
                <Button flex='1' variant='ghost'>
                    Compartilhar
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CardPauta;
