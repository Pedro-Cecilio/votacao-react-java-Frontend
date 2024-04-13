interface CriarUsuarioResposta{
    id: number;
    email: string;
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