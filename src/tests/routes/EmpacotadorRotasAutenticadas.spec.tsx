import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import EmpacotadorRotasAutenticadas from "../../routes/EmpacotadorRotasAutenticadas"
import tema from "../../temas/temas"
import { render, waitFor } from "@testing-library/react"
import { useNavigateMock } from "../__mocks__/useNavigateMock"
import { useBuscarUsuarioLogadoMock } from "../__mocks__/useBuscarUsuarioLogadoMock"
import { useDadosUsuarioStoreMock } from "../__mocks__/useDadosUsuarioStoreMock"
import { useTokenLocalStorageMock } from "../__mocks__/useTokenLocalStorageMock"

describe("Testando componente Empacotador de rotas autenticadas", () => {
    const { buscarUsuarioLogadoMockSucesso, buscarUsuarioLogadoMockErro } = useBuscarUsuarioLogadoMock()
    const { useDadosUsuarioAdminPauta } = useDadosUsuarioStoreMock();

    const buscarTokenMock = jest.fn();
    const navigateMock = jest.fn();
    const buscarUsuarioLogadoMock = jest.fn();
    const setDadosUsuarioMock = jest.fn();
    beforeEach(() => {
        buscarTokenMock.mockClear();
        navigateMock.mockClear();
        buscarUsuarioLogadoMock.mockClear();
        setDadosUsuarioMock.mockClear();

        useNavigateMock(navigateMock);
        useTokenLocalStorageMock(buscarTokenMock, jest.fn(), jest.fn());
        useDadosUsuarioAdminPauta(setDadosUsuarioMock)

    })
    it("Deve redirecionar usuário com token inválido para login", async () => {
        buscarUsuarioLogadoMockErro(buscarUsuarioLogadoMock)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <EmpacotadorRotasAutenticadas />
                </ChakraProvider>
            </BrowserRouter>
        )
        await waitFor(() => expect(setDadosUsuarioMock).not.toHaveBeenCalled());
        await waitFor(() => expect(navigateMock).toHaveBeenCalled());
    })
    it("Deve capturar dados do usuário com token válido", async () => {
        buscarUsuarioLogadoMockSucesso(buscarUsuarioLogadoMock)
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <EmpacotadorRotasAutenticadas />
                </ChakraProvider>
            </BrowserRouter>
        )
        await waitFor(() => expect(setDadosUsuarioMock).toHaveBeenCalled());
        await waitFor(() => expect(navigateMock).not.toHaveBeenCalled());
    })

})