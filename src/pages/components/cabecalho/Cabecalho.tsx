import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react"
import logo from "../../../assets/logo.svg"
import { Link as ReactRouterLink } from "react-router-dom"

const Cabecalho = () => {

    return (
        <Flex as="header" bg={'cinza.700'} p={3} justifyContent={"space-between"} alignItems={"center"} textColor={"branco"}>
            <Image src={logo} w='50px' />
            <ChakraLink as={ReactRouterLink} to={"/perfil"} fontWeight={"bold"} m={1}>Perfil</ChakraLink >
        </Flex >
    )

}

export default Cabecalho;