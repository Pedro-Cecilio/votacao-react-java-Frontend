import * as loginService from '../../services/loginUsuario.service';


export const loginMocks = () => {
    const autenticacaoRespostaDados: AutenticacaoRespostaDados = {
        admin: false,
        token: "tokenValido"
    }

    const loginUsuarioServiceMock = () => {
        jest.spyOn(loginService, 'loginUsuarioService').mockResolvedValue(autenticacaoRespostaDados);
    }

    return {
        loginUsuarioServiceMock,
        autenticacaoRespostaDados
    }
}