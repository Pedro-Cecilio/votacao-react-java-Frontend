import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import tema from "../../../../temas/temas";
import MenuCardPauta from "../../../../pages/components/menuCardPauta/menuCardPauta";
import { respostaPautaDadosMock } from "../../../__mocks__/models/respostaPautaDadosMocks";
import { useDadosAbrirVotacaoStoreMock } from "../../../__mocks__/useDadosAbrirVotacaoStoreMock";
import { useNavigateMock } from "../../../__mocks__/useNavigateMock";
import { SessaoVotacaoResposta } from "../../../../models/sessaoVotacaoModels";

describe("Testando componente de ExplorarPautas com usuário não admin", () => {

    const pauta = respostaPautaDadosMock()
    const setPautaIdMock = jest.fn();
    const writeTextMock = jest.fn()
    const navigateMock = jest.fn();

    const renderizarComponente = (sessaoVotacao: SessaoVotacaoResposta | null) => {
        render(
            <BrowserRouter >
                <ChakraProvider theme={tema}>
                    <MenuCardPauta pautaId={pauta.id} sessaoVotacao={sessaoVotacao} />
                </ChakraProvider>
            </BrowserRouter>
        )
    }

    beforeEach(() => {
        useDadosAbrirVotacaoStoreMock(setPautaIdMock);
        useNavigateMock(navigateMock);
    })

    Object.assign(navigator, {
        clipboard: {
            writeText: writeTextMock,
        },
    });

    it("Deve renderizar somente abrir votação quando a sessão for nula", async () => {
        renderizarComponente(null)
        const menuItemAbrirVotacao = screen.queryByTestId("menuItem-abrir-votacao");
        const menuItemCompartilhar = screen.queryByTestId("menuItem-compartilhar-votacao");
        const menuItemDetalhes = screen.queryByTestId("menuItem-detalhes-votacao");

        expect(menuItemAbrirVotacao).toBeDefined();
        expect(menuItemCompartilhar).toBeNull();
        expect(menuItemDetalhes).toBeNull();
    })
    it("Não deve renderizar abrir votação quando a sessão não for nula", async () => {
        renderizarComponente(pauta.sessaoVotacao)
        const menuItemAbrirVotacao = screen.queryByTestId("menuItem-abrir-votacao");
        expect(menuItemAbrirVotacao).toBeNull();

    })
    it("Deve ser possível abrir modal para abrir votação quando a sessão for nula", async () => {
        renderizarComponente(null)
        const menuAbrirVotacao = screen.getByTestId("menuItem-abrir-votacao");
        await waitFor(() => menuAbrirVotacao.click());
        const modalIniciarVotacao = screen.getByTestId("modal-iniciar-votacao")
        await waitFor(() => expect(setPautaIdMock).toHaveBeenCalledWith(pauta.id))
        await waitFor(() => expect(modalIniciarVotacao).toBeDefined())
    })
    it("Deve renderizar compartilhar votação enquanto ela estiver ativa", async () => {
        renderizarComponente(pauta.sessaoVotacao)
        const menuItemCompartilhar = screen.queryByTestId("menuItem-compartilhar-votacao");
        expect(menuItemCompartilhar).toBeDefined();
    })
    it("Deve ser possível copiar link ao clicar em compartilhar", async () => {
        renderizarComponente(pauta.sessaoVotacao)
        const menuItemCompartilhar = screen.getByTestId("menuItem-compartilhar-votacao");
        await waitFor(() => menuItemCompartilhar.click());
        await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(screen.getByText("Link copiado para área de transferência")).toBeDefined())
    })

    it("Deve renderizar detalhes quando a sessão não for nula", async () => {
        renderizarComponente(pauta.sessaoVotacao)
        const menuItemDetalhes = screen.getByTestId("menuItem-detalhes-votacao");
        await waitFor(() => menuItemDetalhes.click());
        await waitFor(() => expect(menuItemDetalhes).toBeDefined());
    })
    it("Deve ser redirecionado para tela de detalhes ao clicar em detalhes", async () => {
        renderizarComponente(pauta.sessaoVotacao)
        const menuItemDetalhes = screen.getByTestId("menuItem-detalhes-votacao");
        await waitFor(() => menuItemDetalhes.click());
        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith(`/detalhes/${pauta.id}`))
    })
})