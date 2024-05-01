import * as hook from "../../hooks/useCriarUsuario"


export const useCriarUsuarioMock = (jestfn: jest.Mock<any, any, any>)=>{
    const criarUsuarioResposta: CriarUsuarioResposta = {
        id: 1,
        email: "novousuario@email.com",
        nome: "João",
        sobrenome: "Silva",
        cpf: "12345678900",
        admin: false
    }
    jest.spyOn(hook, 'useCriarUsuario').mockReturnValue({
        criarUsuario: jestfn.mockResolvedValue(criarUsuarioResposta)
    });
}