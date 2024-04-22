interface CriarUsuarioResposta{
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    admin: boolean;
}
interface UsuarioResposta{
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    admin: boolean;
}

interface CriarUsuarioDados{
    autenticacaoDto: AutenticacaoDados;
    nome: string;
    sobrenome: string;
    cpf: string;
    admin: boolean;
}

interface VerificarSeUsuarioExisteResposta{
    existe: boolean;
}