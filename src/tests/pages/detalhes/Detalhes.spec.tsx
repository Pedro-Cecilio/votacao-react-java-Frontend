import { BrowserRouter } from "react-router-dom";
import { detalhesPautaMock } from "../../__mocks__/detalhesPautaMock";
import { useTokenLocalStorageMock } from "../../__mocks__/useTokenLocalStorageMock"
import { ChakraProvider } from "@chakra-ui/react";
import tema from "../../../temas/temas";
import Detalhes from "../../../pages/detalhes/Detalhes";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { useNavigateMock } from "../../__mocks__/useNavigateMock";





describe("Testando página de detalhes", () => {
    const { detalhesPautaDados, buscarDetalhesPautaServiceMock } = detalhesPautaMock();
    const obterTokenMock = jest.fn();
    const navigateMock = jest.fn();
    beforeEach(async () => {
        await act(async () => {
            useTokenLocalStorageMock(obterTokenMock, jest.fn(), jest.fn());
            buscarDetalhesPautaServiceMock();
            useNavigateMock(navigateMock)
            render(
                <BrowserRouter>
                    <ChakraProvider theme={tema}>
                        <Detalhes />
                    </ChakraProvider>
                </BrowserRouter>
            );
        })
    })
    it("Deve encontrar elementos da página de detalhes", async () => {
        const h1 = screen.getByText("Detalhes da Pauta");
        const assunto = screen.getByTestId("assunto-pauta");
        const categoria = screen.getByTestId("categoria-pauta");
        const criador = screen.getByTestId("criador-pauta");
        const votosPositivos = screen.getByTestId("votosPositivos-pauta");
        const votosNegativos = screen.getByTestId("votosNegativos-pauta");
        const retornar = screen.getByTestId("retornar-pauta");

        await waitFor(() => expect(h1).toBeDefined())
        await waitFor(() => expect(assunto).toBeDefined())
        await waitFor(() => expect(categoria).toBeDefined())
        await waitFor(() => expect(criador).toBeDefined())
        await waitFor(() => expect(votosPositivos).toBeDefined())
        await waitFor(() => expect(votosNegativos).toBeDefined())
        await waitFor(() => expect(retornar).toBeDefined())
    })
    it("Deve encontrar dados da pauta", async () => {
        const assuntoValor = detalhesPautaDados.dadosPauta.assunto;
        const categoriaValor = detalhesPautaDados.dadosPauta.categoria;
        const nomeCriador = detalhesPautaDados.dadosPauta.usuario.nome;
        const sobrenomeCriador = detalhesPautaDados.dadosPauta.usuario.sobrenome;
        const votosPositivosValor = detalhesPautaDados.dadosPauta.sessaoVotacao!.votosPositivos;
        const votosNegativosValor = detalhesPautaDados.dadosPauta.sessaoVotacao!.votosNegativos;

        const assunto = screen.getByTestId("assunto-pauta").textContent;
        const categoria = screen.getByTestId("categoria-pauta").textContent;
        const criador = screen.getByTestId("criador-pauta").textContent;
        const votosPositivos = screen.getByTestId("votosPositivos-pauta").textContent;
        const votosNegativos = screen.getByTestId("votosNegativos-pauta").textContent;


        expect(assunto).toContain(assuntoValor);
        expect(categoria).toContain(categoriaValor)
        expect(criador).toContain(nomeCriador)
        expect(criador).toContain(sobrenomeCriador)
        expect(votosPositivos).toContain(votosPositivosValor.toString())
        expect(votosNegativos).toContain(votosNegativosValor.toString())
    })
    it("Deve ser possível retornar para pagina minhas pautas", async () => {
        const retornar = screen.getByTestId("retornar-pauta");
        await userEvent.click(retornar);
        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/minhasPautas"))
    })
})