import * as criarUsuarioService from "../../services/criarUsuario.service"
import * as useCriarUsuario from "../../hooks/useCriarUsuario"
import * as useTokenLocalStorage from "../../hooks/useTokenLocalStorage"
import * as useDadosUsuarioStore from "../../hooks/useDadosUsuarioStore"
import * as router from 'react-router'

import Cadastro from "../../pages/cadastro/Cadastro"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import tema from "../../temas/temas"
import { act } from "react-dom/test-utils"


describe("Testando página de cadastro", () => {
    const EMAIL_TESTID: string = "input-email";
    const SENHA_TESTID: string = "input-senha";
    const NOME_TESTID: string = "input-nome";
    const SOBRENOME_TESTID: string = "input-sobrenome";
    const CPF_TESTID: string = "input-cpf";
    const TIPOUSUARIO_TESTID: string = "input-tipoDeUsuario";
    const BOTAO_TESTID: string = "botao-criarUsuario";

  
    const cadastrarUsuario = (
        email: string,
        senha: string,
        nome: string,
        sobrenome: string,
        cpf: string,
        tipoUsuario: string
    ) => {
        act(() => {
            const emailInput = screen.getByTestId(EMAIL_TESTID);
            const senhaInput = screen.getByTestId(SENHA_TESTID);
            const nomeInput = screen.getByTestId(NOME_TESTID);
            const sobrenomeInput = screen.getByTestId(SOBRENOME_TESTID);
            const cpfInput = screen.getByTestId(CPF_TESTID);
            const tipoUsuarioSelect = screen.getByTestId(TIPOUSUARIO_TESTID);
            const botaoCadastro = screen.getByTestId(BOTAO_TESTID);

            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.change(senhaInput, { target: { value: senha } });
            fireEvent.change(nomeInput, { target: { value: nome } });
            fireEvent.change(sobrenomeInput, { target: { value: sobrenome } });
            fireEvent.change(cpfInput, { target: { value: cpf } });
            fireEvent.change(tipoUsuarioSelect, { target: { value: tipoUsuario } });

            fireEvent.click(botaoCadastro);
        })
    }

    const novoUsuario = {
        email: 'novoUsuario@email.com',
        senha: 'senha123',
        nome: 'João',
        sobrenome: 'Silva',
        cpf: '12345678900',
        tipoUsuario: 'USUARIO'
    };
    const criarUsuarioResposta: CriarUsuarioResposta = {
        id: 1,
        email: "novousuario@email.com",
        nome: "Junior",
        sobrenome: "Filho",
        cpf: "12345678910",
        admin: false
    }

    const criarUsuarioMock = jest.fn().mockResolvedValue(criarUsuarioResposta);
    const obterTokenMock = jest.fn().mockReturnValue("tokenValido");


    beforeEach(() => {
        criarUsuarioMock.mockClear();
        obterTokenMock.mockClear();
        
        jest.spyOn(router, 'useNavigate').mockImplementation(() => jest.fn());

        jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
            setDadosUsuario: jest.fn(),
            admin: true,
            id: 1,
            nome: "Saulo",
            sobrenome: "Silva",
        });

        jest.spyOn(criarUsuarioService, 'criarUsuarioService').mockResolvedValue(criarUsuarioResposta);

        jest.spyOn(useCriarUsuario, 'useCriarUsuario').mockReturnValue({
            criarUsuario: criarUsuarioMock
        });

        jest.spyOn(useTokenLocalStorage, 'useTokenLocalStorage').mockReturnValue({
            obterTokenDoLocalStorage: obterTokenMock,
            inserirTokenNoLocalStorage: jest.fn(),
            removerTokenDoLocalStorage: jest.fn()
        });

        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <Cadastro />
                </ChakraProvider>
            </BrowserRouter>
        )
    })
    it("Deve encontrar todos campos do cadastro", () => {
        const emailInput = screen.getByTestId(EMAIL_TESTID);
        const senhaInput = screen.getByTestId(SENHA_TESTID);
        const nomeInput = screen.getByTestId(NOME_TESTID);
        const sobrenomeInput = screen.getByTestId(SOBRENOME_TESTID);
        const cpfInput = screen.getByTestId(CPF_TESTID);
        const tipoUsuarioSelect = screen.getByTestId(TIPOUSUARIO_TESTID);
        const botaoCadastro = screen.getByTestId(BOTAO_TESTID);

        expect(emailInput).toBeDefined()
        expect(senhaInput).toBeDefined()
        expect(nomeInput).toBeDefined()
        expect(sobrenomeInput).toBeDefined()
        expect(cpfInput).toBeDefined()
        expect(tipoUsuarioSelect).toBeDefined()
        expect(botaoCadastro).toBeDefined()
    })

    it("Deve cadastrar usuário corretamente", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, novoUsuario.sobrenome, novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(obterTokenMock).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(screen.getByText("Usuário criado com sucesso")).toBeDefined())

    })

    it("Deve falhar ao cadastrar usuário com email inválido", async () => {
        cadastrarUsuario("emailInvalido", novoUsuario.senha, novoUsuario.nome, novoUsuario.sobrenome, novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Email deve ter formato válido.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com senha inválida", async () => {
        cadastrarUsuario(novoUsuario.email, "12345", novoUsuario.nome, novoUsuario.sobrenome, novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Senha deve conter no mínimo 8 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com nome com menos de 3 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, "Pe", novoUsuario.sobrenome, novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Nome deve conter no mínimo 3 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com nome com mais de 20 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, "NomeComMaisDeVinteCaracteres", novoUsuario.sobrenome, novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Nome deve conter no máximo 20 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com sobrenome com menos de 2 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, "S", novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Sobrenome deve conter no mínimo 2 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com nome com mais de 20 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, "SobrenomeComMaisDeVinteCaracteres", novoUsuario.cpf, novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Sobrenome deve conter no máximo 20 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com cpf com menos de 11 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, novoUsuario.sobrenome, "1234567891", novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Cpf deve ter exatamente 11 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário com cpf com mais de 11 caracteres", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, novoUsuario.sobrenome, "123456789101", novoUsuario.tipoUsuario);

        await waitFor(() => expect(screen.getByText("Cpf deve ter exatamente 11 caracteres.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })
    it("Deve falhar ao cadastrar usuário sem informar tipo de usuário", async () => {
        cadastrarUsuario(novoUsuario.email, novoUsuario.senha, novoUsuario.nome, novoUsuario.sobrenome, novoUsuario.cpf, "");

        await waitFor(() => expect(screen.getByText("Tipo de usuario deve ser informado.")).toBeDefined())
        await waitFor(() => expect(criarUsuarioMock).toHaveBeenCalledTimes(0))
    })


})