import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { AxiosError } from "axios";
import { RespostaPautaDados } from "../../models/pautaModels";
import CardPauta from "../components/cardPauta/CardPauta";
import { useNavigate, useParams } from "react-router-dom";
import { useInserirVoto } from "../../hooks/useInserirVoto";
import { TipoDeVoto } from "../../enums/tipoDeVoto";
import FormularioCpf from "./components/formularioCpf/FormularioCpf";
import FormularioSenha from "./components/formularioSenha/FormularioSenha";
import NaoEncontrado from "../components/naoEncontrado/NaoEncontrado";
import { buscarPautaPorIdService } from "../../services/pauta.service";

const VotoExterno = () => {
    const { id: pautaId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toastErro, toastSucesso } = useToastPersonalizado();
    const [usuarioExiste, setUsuarioExiste] = useState<boolean>(false);
    const [usuarioSeValidou, setUsuarioSeValidou] = useState<boolean>(false);
    const [senha, setSenha] = useState<string>("");
    const [pauta, setPauta] = useState<RespostaPautaDados | null>(null);
    const [buscaConcluida, setBuscaConcluida] = useState<boolean>(false);
    const [paginaCarregada, setPaginaCarregada] = useState<boolean>(false);
    const navigate = useNavigate();
    const { inserirVotoExterno } = useInserirVoto();
    const [cpf, setCpf] = useState<string>("");


    const BuscarPauta = async () => {
        try {
            const resposta = await buscarPautaPorIdService(pautaId!);
            setPauta(resposta);
            setBuscaConcluida(true);
        } catch (error) {
            setBuscaConcluida(true)
        }
    }
    useEffect(() => {
        BuscarPauta();
    }, []);

    useEffect(() => {
        if (buscaConcluida) {
            setPaginaCarregada(true);
        }
    }, [buscaConcluida]);

    const metodoParaVotarNaPauta = async (tipoDeVoto: TipoDeVoto, pautaId: number) => {
        try {
            await inserirVotoExterno(pautaId, tipoDeVoto, cpf, senha);
            toastSucesso("Voto inserido com sucesso")
            navigate("/")
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem);
        }
    }

    if (!pauta && paginaCarregada) {
        return <NaoEncontrado />;
    }
    return pauta && paginaCarregada && (
        <Flex
            bg={"cinza.700"}
            color={"branco"}
            pt={16}
            gap={16}
            h={"100vh"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            {!cpf && <FormularioCpf setUsuarioExiste={setUsuarioExiste} setCpf={setCpf} isLoading={isLoading} setIsloading={setIsLoading} />}
            {cpf && usuarioExiste && !usuarioSeValidou && <FormularioSenha setUsuarioSeValidou={setUsuarioSeValidou} setSenha={setSenha} cpf={cpf} isLoading={isLoading} setIsloading={setIsLoading} />}
            {((cpf && usuarioExiste && usuarioSeValidou) || (cpf && !usuarioExiste && !usuarioSeValidou)) && <CardPauta respostaPautaDados={pauta} metodoParaVotar={metodoParaVotarNaPauta} id="1"/>}
            
        </Flex>
    )



}

export default VotoExterno;