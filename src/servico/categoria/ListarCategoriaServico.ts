import prismaClient from "../../prisma";

class ListarCategoriaServico {
  async execute() {
    const categoriasAtivadas = await prismaClient.categoria.findMany({
      where: {
        situacao: true 
      }
    });

    return categoriasAtivadas;
  }
}

export { ListarCategoriaServico };