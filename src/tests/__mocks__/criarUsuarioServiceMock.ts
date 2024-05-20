import * as service from "../../services/criarUsuario.service"


export const criarUsuarioServiceMock = () => {
    const criarUsuarioResposta: CriarUsuarioResposta = {
        id: 1,
        email: "novousuario@email.com",
        nome: "João",
        sobrenome: "Silva",
        cpf: "12345678900",
        admin: false
    }
    const mockCriarUsuarioService = () => { 
        return jest.spyOn(service, 'criarUsuarioService').mockResolvedValue(criarUsuarioResposta);
    }
    const limparMockCriarUsuarioService = () => {
        mockCriarUsuarioService().mockClear();
    };

    return {
        mockCriarUsuarioService,
        limparMockCriarUsuarioService
    };
}