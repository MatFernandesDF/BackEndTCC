import prismaClient from "../../prisma";

class ListarUsuariosServico {
  async execute() {
    const usuarios = await prismaClient.usuario.findMany(); // Supondo que a tabela de usuários se chame "user"

    return usuarios;
  }
}

export { ListarUsuariosServico };