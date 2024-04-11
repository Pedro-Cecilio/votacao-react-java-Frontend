interface CriarUsuarioResposta{
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    admin: boolean;
}

interface CriarAutenticacaoDados{
    email: string;
    senha: string;
}

interface CriarUsuarioDados{
    criarAutenticacaoDto: CriarAutenticacaoDados;
    nome: string;
    sobrenome: string;
    cpf: string;
    admin: boolean;
}