import * as useCriarUsuario from "../../hooks/useCriarUsuario"


export const useCriarUsuarioMock = (jestfn: jest.Mock<any, any, any>)=>{
    const criarUsuarioResposta: CriarUsuarioResposta = {
        id: 1,
        email: "novousuario@email.com",
        nome: "João",
        sobrenome: "Silva",
        cpf: "12345678900",
        admin: false
    }
    jest.spyOn(useCriarUsuario, 'useCriarUsuario').mockReturnValue({
        criarUsuario: jestfn.mockResolvedValue(criarUsuarioResposta)
    });
}