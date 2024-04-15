import { Box, VStack } from "@chakra-ui/react"
import Cabecalho from "../pages/components/cabecalho/Cabecalho"
import { Outlet } from "react-router-dom"

const RotasComCabecalho = () => {
    return (
        <VStack spacing={0} alignItems="stretch" minH="100vh">
            <Cabecalho />
            <Box
                as="main"
                flex="1"
                flexBasis="calc(100vh - 74px)"
            >
                <Outlet />
            </Box>
        </VStack>
    )
}

export default RotasComCabecalho