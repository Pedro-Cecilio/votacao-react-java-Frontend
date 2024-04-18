import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react"
import logo from "../../../assets/logo.svg"
import { Link as ReactRouterLink } from "react-router-dom"
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore"

const Cabecalho = () => {
    const { admin } = useDadosUsuarioStore()
    return (
        <Flex as="header" bg={'cinza.700'} p={3} justifyContent={"space-between"} alignItems={"center"} textColor={"branco"}>
            <Image src={logo} w='50px' />
            <Flex gap={6}>
                <ChakraLink as={ReactRouterLink} to={"/explorar"} fontWeight={"bold"} m={1}>Explorar</ChakraLink >
                {admin &&
                    <ChakraLink as={ReactRouterLink} to={"/minhasPautas"} fontWeight={"bold"} m={1}>Minhas pautas</ChakraLink >
                }
                <ChakraLink as={ReactRouterLink} to={"/perfil"} fontWeight={"bold"} m={1}>Perfil</ChakraLink >
            </Flex>
        </Flex >
    )

}

export default Cabecalho;