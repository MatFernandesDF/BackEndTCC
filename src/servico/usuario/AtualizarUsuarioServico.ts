import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

interface AtualizarUsuarioRequest {
  id: string;
  nome: string;
  senha: string;
  nivel_acesso: number;
  email: string;
}

class AtualizarUsuarioServico {
  async execute({ id, nome, email, senha, nivel_acesso }: AtualizarUsuarioRequest) {
    const atualizacoes: any = {};

    if (nome) {
      atualizacoes.nome = nome;
    }
    if (email) {
      atualizacoes.email = email; 
    }

    if (senha) {
      const hashedSenha = await bcrypt.hash(senha, 10);
      atualizacoes.senha = hashedSenha;
    }

    if (nivel_acesso) {
      atualizacoes.nivel_acesso = nivel_acesso;
    }

    const usuario = await prismaClient.usuario.update({
      where: {
        id: id,
      },
      data: atualizacoes,
    });

    return usuario;
  }
}

export { AtualizarUsuarioServico };