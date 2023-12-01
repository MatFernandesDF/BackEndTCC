import prismaClient from "../../prisma";

class ListarUsuariosServico {
  async execute() {
    const usuarios = await prismaClient.usuario.findMany();

    return usuarios;
  }
}

export { ListarUsuariosServico };