import { useState } from "react";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";
import { useCriarUsuario } from "../../../hooks/useCriarUsuario";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup } from "@chakra-ui/react";

interface CadastroProps {
    mensagemH1: string;
    admin: boolean;
}
const Cadastro = ({ mensagemH1, admin }: CadastroProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { toastErro } = useToastPersonalizado();
    const { criarUsuario } = useCriarUsuario();
    const navigate = useNavigate();

    const inputSchema = z.object({
        email: z.string().email("Email deve ter formato válido."),
        senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres."),
        nome: z.string().min(3, "Nome deve conter no mínimo 3 caracteres.").max(20, "Nome deve conter no máximo 20 caracteres."),
        sobrenome: z.string().min(2, "Sobrenome deve conter no mínimo 2 caracteres.").max(20, "Sobrenome deve conter no máximo 20 caracteres."),
        cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres")
    })

    type inputs = z.infer<typeof inputSchema>

    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = async ({ email, senha, nome, sobrenome, cpf }: inputs) => {
        try {
            setIsLoading(true)
            await criarUsuario(email, senha, nome, sobrenome, cpf, admin)
            navigate("/login")
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

    return (
        <Flex
            gap={12}
            backgroundColor={'cinza.700'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            textColor={'branco'}
            minH='100vh'
        >
            <Heading as={'h1'} size={'xl'}>{mensagemH1}</Heading>
            <form
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <InputGroup
                        gap={2}
                        display={'flex'}
                        flexDirection={'column'}
                        maxWidth={500}
                        minWidth={300}
                    >
                        <FormLabel>Email</FormLabel>
                        <Input type='email'  {...register('email')} data-testid="input-email" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Senha</FormLabel>
                        <Input type='password' {...register('senha')} data-testid="input-senha" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Nome</FormLabel>
                        <Input type='text' {...register('nome')} data-testid="input-nome" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Sobrenome</FormLabel>
                        <Input type='text' {...register('sobrenome')} data-testid="input-sobrenome" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Cpf</FormLabel>
                        <Input type='text' {...register('cpf')} data-testid="input-cpf" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                    </InputGroup>
                </FormControl>
                <Button
                    isLoading={isLoading}
                    my={4}
                    maxWidth={300}
                    minWidth={200}
                    type="submit"
                    colorScheme='gray'>
                    Enviar
                </Button>
            </form>
        </Flex>

    );
}

export default Cadastro;