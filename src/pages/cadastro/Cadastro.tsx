import { useState } from "react";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { useCriarUsuario } from "../../hooks/useCriarUsuario";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, Select } from "@chakra-ui/react";
import { TipoDeUsuario } from "../../enums/tipoDeUsuario";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import NaoAutorizado from "../components/naoAutorizado/NaoAutorizado";

const Cadastro = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { toastErro } = useToastPersonalizado();
    const { criarUsuario } = useCriarUsuario();
    const navigate = useNavigate();
    const { admin } = useDadosUsuarioStore();

    const inputSchema = z.object({
        email: z.string().email("Email deve ter formato válido."),
        senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres."),
        nome: z.string().min(3, "Nome deve conter no mínimo 3 caracteres.").max(20, "Nome deve conter no máximo 20 caracteres."),
        sobrenome: z.string().min(2, "Sobrenome deve conter no mínimo 2 caracteres.").max(20, "Sobrenome deve conter no máximo 20 caracteres."),
        cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres."),
        tipoDeUsuario: z.string().min(1, "Tipo de usuario deve ser informado.")
    })

    type inputs = z.infer<typeof inputSchema>

    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = async ({ email, senha, nome, sobrenome, cpf, tipoDeUsuario }: inputs) => {
        try {
            setIsLoading(true)
            await criarUsuario(email, senha, nome, sobrenome, cpf, tipoDeUsuario == TipoDeUsuario.ADMINISTRADOR)
            navigate("/")
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
        admin ? (
            <Flex
                gap={8}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Heading as={'h1'} size={'lg'} mt={2}>Cadastrar Usuário</Heading>
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
                            <Input type='email'  {...register('email')} data-testid="input-email" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }} />
                            <FormLabel>Senha</FormLabel>
                            <Input type='password' {...register('senha')} data-testid="input-senha" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }} />
                            <FormLabel>Nome</FormLabel>
                            <Input type='text' {...register('nome')} data-testid="input-nome" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }} />
                            <FormLabel>Sobrenome</FormLabel>
                            <Input type='text' {...register('sobrenome')} data-testid="input-sobrenome" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }} />
                            <FormLabel>Cpf</FormLabel>
                            <Input type='text' {...register('cpf')} data-testid="input-cpf" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }} />
                            <FormLabel htmlFor='tipoDeUsuario'>Tipo de Usuario</FormLabel>
                            <Select {...register("tipoDeUsuario")} data-testid="input-tipoDeUsuario" borderColor={"cinza.500"} _hover={{ borderColor: "cinza.800" }} _focus={{ boxShadow: "none", borderColor: "cinza.800" }}>
                                {Object.values(TipoDeUsuario).map((tipo) => (
                                    <option key={tipo} value={tipo} style={{ color: "black" }}>
                                        {tipo}
                                    </option>
                                ))}
                            </Select>
                        </InputGroup>
                    </FormControl>
                    <Button
                        isLoading={isLoading}
                        my={4}
                        maxWidth={300}
                        minWidth={200}
                        type="submit"
                        colorScheme='gray'>
                        Cadastrar
                    </Button>
                </form>
            </Flex>
        ) : <NaoAutorizado/>
    );


}

export default Cadastro;