import prismaClient from "../../prisma";

class ListarOrdemUsuarioServicos {
  async execute(userId: string) {
    const ordens = await prismaClient.ordem.findMany({
      where: {
        rascunho: false,
        status: false,
        usuario_id: userId,
      },
      orderBy: {
        criado_em: 'desc',
      },
    });

    return ordens;
  }
}

export { ListarOrdemUsuarioServicos };