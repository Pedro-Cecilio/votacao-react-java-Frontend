import { Flex, Image } from "@chakra-ui/react"
import notFound from "../../../assets/notFound.svg"
import logo from "../../../assets/logo.svg"

const NaoEncontrado = () => {
    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}  bg={"cinza.700"} position={"relative"} data-testid={"nao-encontrado"}>

            <Image src={logo} w={14} position={"absolute"} top={3} left={3}/>
            <Image src={notFound} w={{base:"60%", md:"40%", lg:"30%"}}/>
        </Flex>
    )
}

export default NaoEncontrado;