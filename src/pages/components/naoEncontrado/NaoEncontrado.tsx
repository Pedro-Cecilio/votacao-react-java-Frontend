import { Flex, Image } from "@chakra-ui/react"
import notFound from "../../../assets/notFound.svg"

const NaoEncontrado = () => {
    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"} bg={"cinza.700"} >
            <Image src={notFound} w={{base:"60%", md:"40%", lg:"30%"}}/>
        </Flex>
    )
}

export default NaoEncontrado;