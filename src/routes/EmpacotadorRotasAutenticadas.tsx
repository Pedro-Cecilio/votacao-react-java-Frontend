import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDadosUsuarioStore } from "../hooks/useDadosUsuarioStore"
import { useBuscarUsuarioLogado } from "../hooks/useBuscarUsuarioLogado"
import { useTokenLocalStorage } from "../hooks/useTokenLocalStorage"
import { Box, VStack } from "@chakra-ui/react"
import Cabecalho from "../pages/components/cabecalho/Cabecalho"

const EmpacotadorRotasAutenticadas = ({ children }: { children?: React.ReactNode }) => {
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const navigate = useNavigate();
    const { setDadosUsuario } = useDadosUsuarioStore();
    const { buscarUsuarioLogado } = useBuscarUsuarioLogado();

    useEffect(() => {
        const validarToken = async () => {
            try {
                const token = obterTokenDoLocalStorage();
                if(token.trim().length == 0) return navigate("/")
                const response = await buscarUsuarioLogado(token);
                setDadosUsuario(response.id, response.nome, response.sobrenome, response.admin);
            } catch (error) {
                navigate("/")
            }
        }
        validarToken();
    }, [])

    return (
        <VStack spacing={0} alignItems="stretch" minH="100vh">
            <Cabecalho />
            <Box
                as="main"
                flex="1"
                flexBasis="calc(100vh - 74px)"
            >
                {children ?? <Outlet />}
            </Box>
        </VStack>
    )
}

export default EmpacotadorRotasAutenticadas;