import { Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { z } from "zod"
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado"
import { ValidarVotoExterno } from "../../../../models/sessaoVotacaoModels"
import { useValidarUsuarioPorCpfESenha } from "../../../../hooks/useValidarUsuarioPorCpfESenha"

interface FormularioSenhaProps {
    setUsuarioSeValidou: (usuarioSeValidou: boolean) => void;
    cpf:string
    isLoading: boolean;
    setIsloading: (isLoading: boolean) => void;
}


const FormularioSenha = ({ setUsuarioSeValidou, cpf, isLoading, setIsloading }: FormularioSenhaProps) => {
    const { toastErro } = useToastPersonalizado();
    const { validarUsuarioPorCpfESenha } = useValidarUsuarioPorCpfESenha();


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
        const resposta = await validarUsuarioPorCpfESenha(dados)
        setUsuarioSeValidou(resposta.data.valido)
        setIsloading(false);
    }

    const onError: SubmitErrorHandler<inputSenha> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!)
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
        >
            <FormLabel>Senha:</FormLabel>
            <Input type='password' {...register('senha')} data-testid="input-senha" borderColor={"cinza.400"} _focus={{ boxShadow: "none", borderColor: "cinza.100" }} />
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
}

export default FormularioSenha;