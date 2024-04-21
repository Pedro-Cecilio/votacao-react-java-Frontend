import { Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { AxiosError } from "axios";
import { useBuscarUsuarioPorCpf } from "../../hooks/useBuscarUsuarioPorCpf";
import { RespostaPautaDados } from "../../models/pautaModels";

const VotoExterno = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toastErro, toastSucesso } = useToastPersonalizado();
    const { buscarUsuarioPorCpf } = useBuscarUsuarioPorCpf();
    const [usuario, setUsuario] = useState<UsuarioResposta | null>(null)
    const [pauta, setPauta] = useState<RespostaPautaDados | null>(null)




    const inputSchema = z.object({
        cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres.")
    })
    type inputs = z.infer<typeof inputSchema>
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })
    const onSubmit = async ({ cpf }: inputs) => {
        try {
            setIsLoading(true)
            const resposta = await buscarUsuarioPorCpf(cpf)
            setUsuario(resposta.data)
            toastSucesso("Usuário criado com sucesso")
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
    return !usuario ? (
        <Flex
            bg={"cinza.700"}
            color={"branco"}
            pt={16}
            gap={16}
            h={"100vh"}
            alignItems={"center"}
            flexDirection={"column"}
        >
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

        </Flex>
    )
    :
    <div></div>


}

export default VotoExterno;