import { ChakraProvider } from "@chakra-ui/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import tema from "../../../../../temas/temas";
import { render, screen } from "@testing-library/react";
import CardPauta from "../../../../../pages/components/cardPauta/CardPauta";
import { respostaPautaDadosMock } from "../../../../__mocks__/models/respostaPautaDadosMocks";
import { useDadosUsuarioStoreMock } from "../../../../__mocks__/useDadosUsuarioStoreMock";

describe("Testando componente de ExplorarPautas com usuário admin", () => {
    const { useDadosUsuarioAdminPauta } = useDadosUsuarioStoreMock();

    const metodoParaVotar = jest.fn();
    const pauta = respostaPautaDadosMock()

    beforeEach(async () => {
        await act(async () => {
            useDadosUsuarioAdminPauta()
            render(
                <BrowserRouter >
                    <ChakraProvider theme={tema}>
                        <CardPauta metodoParaVotar={metodoParaVotar} respostaPautaDados={pauta} />
                    </ChakraProvider>
                </BrowserRouter>
            )
        })
    })

    it("Deve verificar se o conteúdo das pautas está sendo apresentado na tela", () => {
        const nomeUsuario = screen.getByTestId(`usuario-nome-${pauta.id}`);
        const categoria = screen.getByTestId(`categoria-${pauta.id}`);
        const assunto = screen.getByTestId(`assunto-${pauta.id}`);

        expect(nomeUsuario.textContent).toContain(`${pauta.usuario.nome} ${pauta.usuario.sobrenome}`);
        expect(categoria.textContent).toContain(pauta.categoria);
        expect(assunto.textContent).toContain(pauta.assunto);
    })
    it("Deve verificar se os botões de voto não aparecem para o dono da pauta", () => {
        const botoesDeVoto = screen.queryByTestId("botoes-votacao");
        expect(botoesDeVoto).toBeNull();
    })
    it("Deve verificar se menu do card aparece para quem é dono da pauta", () => {
        const menuCard = screen.queryByTestId("menu-card-pauta");
        expect(menuCard).toBeDefined();
    })
    it("Deve verificar se o popover é renderizado quando possui sessão de votação ativa", () => {
        const popover = screen.queryByTestId("popover-card-votacao");
        expect(popover).toBeDefined();
    })
})