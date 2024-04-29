import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Filtro from "../../../../pages/components/filtro/Filtro"
import tema from "../../../../temas/temas"
import { Categoria } from "../../../../enums/categoria"


describe("Testando componente de Filtro", () => {
    const onSubmitMock = jest.fn();
    const onErrorMock = jest.fn();

    beforeEach(() => {
        render(
            <ChakraProvider theme={tema}>
                <Filtro onSubmit={onSubmitMock} onError={onErrorMock} />
            </ChakraProvider>
        )
    })

    const abrirFiltro = async () => {
        const botaoAbrirFiltro = screen.getByTestId("botao-filtro");
        await waitFor(() => botaoAbrirFiltro.click());
    }

    it("Deve renderizar botão do filtro", () => {
        const botaoAbrirFiltro = screen.getByTestId("botao-filtro");
        expect(botaoAbrirFiltro).toBeDefined();
    })
    it("Deve abrir drawer do filtro ao clicar no botão", async () => {
        await abrirFiltro();
        const drawerFiltro = screen.getByTestId("drawer-filtro");
        expect(drawerFiltro).toBeDefined();
    })
    it("Deve validar conteúdo do filtro", async () => {
        await abrirFiltro();
        const header = screen.getByTestId("header-filtro");
        const inputCategoria = screen.getByTestId("input-categoria-filtro");
        const botaoFecharFooter = screen.getByTestId("botao-fechar-filtro-footer");
        const botaoFecharTopo = screen.getByTestId("botao-fechar-filtro-topo");
        const botaoFiltrar = screen.getByTestId("botao-filtrar");

        expect(botaoFecharTopo).toBeDefined();
        expect(header).toBeDefined();
        expect(inputCategoria).toBeDefined();
        expect(botaoFecharFooter).toBeDefined();
        expect(botaoFiltrar).toBeDefined();
    })
    it("Deve ser possível filtrar uma categoria", async () => {
        await abrirFiltro();
        const botaoFiltrar = screen.getByTestId("botao-filtrar");
        const selectCategoria = screen.getByTestId("categorias-filtro");
        fireEvent.change(selectCategoria, { target: { value: Categoria.EDUCACAO } });
        fireEvent.click(botaoFiltrar);
        await waitFor(() => expect(onSubmitMock).toHaveBeenCalledWith({
            categoria: Categoria.EDUCACAO
        }));
    })

})