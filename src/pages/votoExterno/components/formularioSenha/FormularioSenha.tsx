import { Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { z } from "zod"
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado"
import { ValidarVotoExterno } from "../../../../models/sessaoVotacaoModels"
import { validarUsuarioPorCpfESenhaService } from "../../../../services/auth.service"

interface FormularioSenhaProps {
    setUsuarioSeValidou: (usuarioSeValidou: boolean) => void;
    setSenha: (senha: string) => void;
    cpf: string
    isLoading: boolean;
    setIsloading: (isLoading: boolean) => void;
}


const FormularioSenha = ({ setUsuarioSeValidou, cpf, isLoading, setIsloading, setSenha }: FormularioSenhaProps) => {
    const { toastErro } = useToastPersonalizado();

    const inputSchema = z.object({
        senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres.")
    })
    type inputSenha = z.infer<typeof inputSchema>

    const {
        register,
        handleSubmit,
    } = useForm<inputSenha>({
        resolver: zodResolver(inputSchema)
    })
    const onSubmit = async ({ senha }: inputSenha) => {
        setIsloading(true);
        const dados: ValidarVotoExterno = {
            cpf,
            senha
        }
        setSenha(senha);
        const resposta = await validarUsuarioPorCpfESenhaService(dados);
        setUsuarioSeValidou(resposta.valido);
        setIsloading(false);
    }

    const onError: SubmitErrorHandler<inputSenha> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!);
                break;
            }
        }
    };
    return (
        <>
            <Heading as={"h1"}>Insira sua senha:</Heading>
            <FormControl
                color={"branco"}
                maxW={"300px"}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={"center"}
                data-testid={"formulario-senha"}
            >
                <FormLabel>Senha:</FormLabel>
                <Input type='password' {...register('senha')} data-testid="input-senha" borderColor={"cinza.400"} _focus={{ boxShadow: "none", borderColor: "cinza.100" }} />
                <Button
                    data-testid={"botao-senha"}
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
}

export default FormularioSenha;