import { Flex, Image } from "@chakra-ui/react"
import naoAutorizado from "../../../assets/naoAutorizado.svg"

const NaoAutorizado = () => {
    return (
        <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Image src={naoAutorizado} w={{base:"60%", sm:"50%", md:"40%", lg:"25%"}}/>
        </Flex>
    )
}

export default NaoAutorizado;