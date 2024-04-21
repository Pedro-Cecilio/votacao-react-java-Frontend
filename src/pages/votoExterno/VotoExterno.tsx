import { Button, Flex, FormControl, FormLabel, Heading, Image, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { AxiosError } from "axios";
import { useBuscarUsuarioPorCpf } from "../../hooks/useBuscarUsuarioPorCpf";
import { RespostaPautaDados } from "../../models/pautaModels";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import CardPauta from "../components/cardPauta/CardPauta";
import { useNavigate, useParams } from "react-router-dom";
import { useBuscarPautaPorId } from "../../hooks/useBuscarPautaPorId";
import conteudoNaoEncontradoBranco from "../../assets/conteudoNaoEncontradoBranco.svg"

const VotoExterno = () => {
    const { id: pautaId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toastErro } = useToastPersonalizado();
    const { buscarUsuarioPorCpf } = useBuscarUsuarioPorCpf();
    const [usuarioValido, setUsuarioValido] = useState<boolean>(false);
    const [pauta, setPauta] = useState<RespostaPautaDados | null>(null);
    const { setDadosUsuario, id } = useDadosUsuarioStore();
    const { buscarPautaPorId } = useBuscarPautaPorId();
    const [buscaConcluida, setBuscaConcluida] = useState<boolean>(false);
    const [paginaCarregada, setPaginaCarregada] = useState<boolean>(false);
    const navigate = useNavigate();

    const BuscarPauta = async () => {
        try {
            const resposta = await buscarPautaPorId(pautaId!);
            setPauta(resposta.data);
            setBuscaConcluida(true);
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.response?.status == 404) {
                setBuscaConcluida(true);
            }
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

    const inputSchema = z.object({
        cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres.")
    })
    type inputs = z.infer<typeof inputSchema>
    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })
    const onSubmit = async ({ cpf }: inputs) => {
        try {
            setIsLoading(true)
            const resposta = await buscarUsuarioPorCpf(cpf)
            const usuario = resposta.data
            setDadosUsuario(usuario.id, usuario.nome, usuario.sobrenome, usuario.admin)
            setUsuarioValido(true)
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                setIsLoading(false)
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem)
        }
        setIsLoading(false)
    }

    const onError: SubmitErrorHandler<inputs> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!)
                break;
            }
        }
    };

    if (!pauta && paginaCarregada) {
        return (
            <Flex justify="center" align="center" h="100vh" bg={"cinza.700"}>
                <Image src={conteudoNaoEncontradoBranco} w={{ base: "60%", md: "50%", lg: "40%" }} />

            </Flex>
        );
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
            {
                !usuarioValido ? (
                    <>
                        <Heading as={"h1"}>Insira seu Cpf</Heading>
                        <FormControl
                            color={"branco"}
                            maxW={"300px"}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={"center"}
                        >
                            <FormLabel>Cpf:</FormLabel>
                            <Input type='text' {...register('cpf')} data-testid="input-cpf" borderColor={"cinza.400"} _focus={{ boxShadow: "none", borderColor: "cinza.100" }} />
                            <Button
                                onClick={handleSubmit(onSubmit, onError)}
                                isLoading={isLoading}
                                my={4}
                                maxWidth={300}
                                minWidth={200}
                                type="submit"
                                colorScheme='gray'>
                                Enviar
                            </Button>
                        </FormControl>
                    </>
                )
                    :
                    <CardPauta respostaPautaDados={pauta} callBackAoVotar={() => { navigate("/") }} />
            }


        </Flex>
    )



}

export default VotoExterno;