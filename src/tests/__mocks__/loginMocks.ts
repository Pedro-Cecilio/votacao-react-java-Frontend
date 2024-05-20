import * as loginService from '../../services/auth.service';


export const loginMocks = () => {
    const autenticacaoRespostaDados: AutenticacaoRespostaDados = {
        admin: false,
        token: "tokenValido"
    }

    const loginServiceMock = () => {
        jest.spyOn(loginService, 'loginService').mockResolvedValue(autenticacaoRespostaDados);
    }

    return {
        loginServiceMock,
        autenticacaoRespostaDados
    }
}