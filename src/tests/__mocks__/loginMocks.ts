import * as useLoginUsuario from '../../hooks/useLoginUsuario';


export const loginMocks = ()=>{
    const autenticacaoRespostaDados: AutenticacaoRespostaDados = {
        admin: false,
        token: "tokenValido"
    }

    const useLoginUsuarioMock = (jestfn: jest.Mock<any, any, any> = jest.fn())=>{
        jest.spyOn(useLoginUsuario, 'useLoginUsuario').mockReturnValue({
            loginUsuario: jestfn.mockResolvedValue(autenticacaoRespostaDados)
        });    }

    return {
        useLoginUsuarioMock,
        autenticacaoRespostaDados
    }
}