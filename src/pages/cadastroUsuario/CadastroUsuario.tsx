import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, useToast } from "@chakra-ui/react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCriarUsuario } from "../../hooks/useCriarUsuario";


const inputSchema = z.object({
    email: z.string().email("Email deve ter formato válido."),
    senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres."),
    nome: z.string().min(3, "Nome deve conter no mínimo 3 caracteres.").max(20, "Nome deve conter no máximo 20 caracteres."),
    sobrenome: z.string().min(2, "Sobrenome deve conter no mínimo 2 caracteres.").max(20, "Sobrenome deve conter no máximo 20 caracteres."),
    cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres")
})

type inputs = z.infer<typeof inputSchema>

const CadastroUsuario = () => {
    const toast = useToast();
    const {criarUsuario} = useCriarUsuario();

    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = (dados: inputs) => {
        criarUsuario(dados.email, dados.senha, dados.nome, dados.sobrenome, dados.cpf, false)
    }

    const onError: SubmitErrorHandler<inputs> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toast({
                    title: "Erro",
                    description: valor.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                })
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
            <Heading as={'h1'} size={'xl'}>Cadastro de Usuário</Heading>
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
                        <Input type='email'  {...register('email')} data-testid="input-email" />
                        <FormLabel>Senha</FormLabel>
                        <Input type='password' {...register('senha')} data-testid="input-senha" />
                        <FormLabel>Nome</FormLabel>
                        <Input type='text' {...register('nome')} data-testid="input-nome" />
                        <FormLabel>Sobrenome</FormLabel>
                        <Input type='text' {...register('sobrenome')} data-testid="input-sobrenome" />
                        <FormLabel>Cpf</FormLabel>
                        <Input type='text' {...register('cpf')} data-testid="input-cpf" />
                    </InputGroup>
                </FormControl>
                <Button
                    my={4}
                    maxWidth={300}
                    minWidth={200}
                    type="submit"
                    colorScheme='blue'>
                    Enviar
                </Button>
            </form>
        </Flex>

    );
}

export default CadastroUsuario;

