import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import tema from "../../../temas/temas"
import VotoExterno from "../../../pages/votoExterno/VotoExterno"
import { useNavigateMock } from "../../__mocks__/useNavigateMock"
import { useParamsMock } from "../../__mocks__/useParamsMock"
import { useVerificarSeUsuarioExistePorCpfMock } from "../../__mocks__/useVerificarSeUsuarioExistePorCpfMock"
import { useBuscarPautaPorIdMock } from "../../__mocks__/useBuscarPautaPorIdMock"
import { useValidarUsuarioPorCpfESenhaMock } from "../../__mocks__/useValidarUsuarioPorCpfESenhaMock"

describe("Testando página de voto externo", () => {
    const { buscarPautaPorIdEncontrada, buscarPautaPorIdNaoEncontrada } = useBuscarPautaPorIdMock();
    const verificarSeUsuarioExistePorCpfMock = jest.fn();
    const validarUsuarioPorCpfESenhaMock = jest.fn();
    const buscarPautaPorIdMock = jest.fn();

    beforeEach(() => {
        useParamsMock("1");
        useNavigateMock();
    })
    it("Deve renderizar somente formulário de cpf ao entrar na página", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        useVerificarSeUsuarioExistePorCpfMock(verificarSeUsuarioExistePorCpfMock, true)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )
        const formularioCpf = screen.queryByTestId("formulario-cpf")
        const formularioSenha = screen.queryByTestId("formulario-senha")
        const cardPauta = screen.queryByTestId("card-pauta")
        await waitFor(() => expect(formularioCpf).toBeDefined())
        await waitFor(() => expect(formularioSenha).toBeNull())
        await waitFor(() => expect(cardPauta).toBeNull())
    })
    it("Deve renderizar componente de senha, após inserir cpf, caso cpf seja de um usuário cadastrado", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        useVerificarSeUsuarioExistePorCpfMock(verificarSeUsuarioExistePorCpfMock, true)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )

        const inputCpf = await waitFor(() => screen.getByTestId("input-cpf"))
        await waitFor(() => fireEvent.change(inputCpf, { target: { value: "12345678910" } }))
        await waitFor(() => screen.getByTestId("botao-enviar-cpf").click())

        const formularioSenha = await waitFor(() => screen.getByTestId("formulario-senha"))
        expect(formularioSenha).toBeDefined()

        const cardPauta = await waitFor(() => screen.queryByTestId("card-pauta"))
        await waitFor(() => expect(cardPauta).toBeNull())
    })
    it("Deve retornar mensagem de erro ao inserir senha com formato inválido", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        useVerificarSeUsuarioExistePorCpfMock(verificarSeUsuarioExistePorCpfMock, true)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )

        const inputCpf = await waitFor(() => screen.getByTestId("input-cpf"))
        await waitFor(() => fireEvent.change(inputCpf, { target: { value: "12345678910" } }))
        await waitFor(() => screen.getByTestId("botao-enviar-cpf").click())

        const inputSenha = await waitFor(() => screen.getByTestId("input-senha"))
        await waitFor(() => fireEvent.change(inputSenha, { target: { value: "senha12" } }))
        await waitFor(() => screen.getByTestId("botao-senha").click())


        const toastError = await waitFor(() => screen.getByText("Senha deve conter no mínimo 8 caracteres."))
        await waitFor(() => expect(toastError).toBeDefined())
    })
    it("Deve renderizar componente de card Pauta, após usuário cadastrado inserir senha válida", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        useVerificarSeUsuarioExistePorCpfMock(verificarSeUsuarioExistePorCpfMock, true)
        useValidarUsuarioPorCpfESenhaMock(validarUsuarioPorCpfESenhaMock, true)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )

        const inputCpf = await waitFor(() => screen.getByTestId("input-cpf"))
        await waitFor(() => fireEvent.change(inputCpf, { target: { value: "12345678910" } }))
        await waitFor(() => screen.getByTestId("botao-enviar-cpf").click())

        const inputSenha = await waitFor(() => screen.getByTestId("input-senha"))
        await waitFor(() => fireEvent.change(inputSenha, { target: { value: "senha123" } }))
        await waitFor(() => screen.getByTestId("botao-senha").click())


        const cardPauta = await waitFor(() => screen.getByTestId("card-pauta"))
        await waitFor(() => expect(cardPauta).toBeDefined())
    })

    it("Deve renderizar componente retornar mensagem de erro ao inserir cpf com formato inválido", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )

        const inputCpf = await waitFor(() => screen.getByTestId("input-cpf"))
        await waitFor(() => fireEvent.change(inputCpf, { target: { value: "1234567891ada" } }))
        await waitFor(() => screen.getByTestId("botao-enviar-cpf").click())
        const toastError = await waitFor(() => screen.getByText("Cpf deve conter 11 caracteres numéricos."))
        await waitFor(() => expect(toastError).toBeDefined())
    })
    it("Deve renderizar componente cardPauta, após inserir cpf, caso cpf seja de um usuário não cadastrado", async () => {
        buscarPautaPorIdEncontrada(buscarPautaPorIdMock)
        useVerificarSeUsuarioExistePorCpfMock(verificarSeUsuarioExistePorCpfMock, false)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )

        const inputCpf = await waitFor(() => screen.getByTestId("input-cpf"))
        await waitFor(() => fireEvent.change(inputCpf, { target: { value: "12345678910" } }))
        await waitFor(() => screen.getByTestId("botao-enviar-cpf").click())

        const formularioSenha = await waitFor(() => screen.queryByTestId("formulario-senha"))
        expect(formularioSenha).toBeNull()

        const cardPauta = await waitFor(() => screen.getByTestId("card-pauta"))
        await waitFor(() => expect(cardPauta).toBeDefined())
    })
    it("Deve renderizar componente naoEncontrado ao não encontrar pauta ativa por id", async () => {
        buscarPautaPorIdNaoEncontrada(buscarPautaPorIdMock)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <VotoExterno />
                </ChakraProvider>
            </BrowserRouter>
        )
        const naoEncontrado = await waitFor(() => screen.getByTestId("nao-encontrado"))
        await waitFor(() => expect(naoEncontrado).toBeDefined())
    })


})