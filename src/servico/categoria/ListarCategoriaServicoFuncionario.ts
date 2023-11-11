import prismaClient from "../../prisma";

class ListarCategoriaServico {
  async execute() {
    const categorias = await prismaClient.categoria.findMany();

    return categorias;
  }
}

export { ListarCategoriaServico }