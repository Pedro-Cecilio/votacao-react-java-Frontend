import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useUtils } from "../utils/useUtils"
import { useDadosUsuarioStore } from "../hooks/useDadosUsuarioStore"
import { useBuscarUsuarioLogado } from "../hooks/useBuscarUsuarioLogado"

const RotasAutenticadas = () => {
    const { obterTokenDoLocalStorage } = useUtils();
    const navigate = useNavigate();
    const { setDadosUsuario } = useDadosUsuarioStore();
    const { buscarUsuarioLogado } = useBuscarUsuarioLogado();

    useEffect(() => {
        const possuiToken = (): boolean => {
            const token = obterTokenDoLocalStorage();
            if (token.trim().length == 0) return false;
            return true;
        };
        const validarToken = async () => {
            try {
                if (!possuiToken()) navigate("/login")
                const token = obterTokenDoLocalStorage();
                const response = await buscarUsuarioLogado(token);
                setDadosUsuario(token, response.admin);
            } catch (error) {
                navigate("/login")
            }
        }
        validarToken();
    }, [])

    return (
        <Outlet />
    )
}

export default RotasAutenticadas