import { act } from "react-dom/test-utils";
import { useTokenLocalStorageMock } from "../../__mocks__/useTokenLocalStorageMock";
import { useDadosUsuarioStoreMock } from "../../__mocks__/useDadosUsuarioStoreMock";
import { useInserirVotoMock } from "../../__mocks__/useInserirVotoMock";
import { render, screen, waitFor } from "@testing-library/react";
import tema from "../../../temas/temas";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ExplorarMinhasPautas from "../../../pages/explorarMinhasPautas/ExplorarMinhasPautas";
import { useLocationMock } from "../../__mocks__/useLocationMock";
import { useBuscarTodasPautasUsuarioLogadoMock } from "../../__mocks__/useBuscarTodasPautasUsuarioLogadoMock";

describe("Testando pagina de explorar minhas pautas", () => {
    const { useDadosUsuarioAdminPauta } = useDadosUsuarioStoreMock();
    const obterTokenMock = jest.fn();
    const inserirVotoInternoMock = jest.fn();
    const buscarTodasPautasUsuarioLogadoMock = jest.fn();
    
    beforeEach(async () => {
        await act(async () => {
            useDadosUsuarioAdminPauta();
            useBuscarTodasPautasUsuarioLogadoMock(buscarTodasPautasUsuarioLogadoMock)
            useLocationMock("/minhasPautas")
            useTokenLocalStorageMock(obterTokenMock);
            useInserirVotoMock(inserirVotoInternoMock, jest.fn());
            render(
                <BrowserRouter >
                    <ChakraProvider theme={tema}>
                        <ExplorarMinhasPautas />
                    </ChakraProvider>
                </BrowserRouter>
            )
        })
    })
    it("Deve buscar todas pautas do usuário logado", async () => {
        await waitFor(() => expect(buscarTodasPautasUsuarioLogadoMock).toHaveBeenCalledTimes(1));

    })
    it("Deve renderizar componente ExplorarPautas", () => {
        const explorarPautas = screen.getByTestId("explorar-pautas");
        expect(explorarPautas).toBeDefined();
    })
    it("Deve renderizar botão para abrir nova pauta", () => {
        const botaoAbrirModalNovaPauta = screen.getByTestId("botao-abrirModalNovaPauta");
        expect(botaoAbrirModalNovaPauta).toBeDefined();
    })
    it("Deve renderizar modal nova pauta ao clicar no botão para abrir nova pauta", async () => {
        const botaoAbrirModalNovaPauta = screen.getByTestId("botao-abrirModalNovaPauta");
        await waitFor(() => botaoAbrirModalNovaPauta.click());
        const modalNovaPauta = screen.getByTestId("modal-nova-pauta");
        expect(modalNovaPauta).toBeDefined();
    })
})