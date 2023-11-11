import prismaClient from "../../prisma";

class ListarCategoriaServico {
  async execute() {
    const categoriasAtivadas = await prismaClient.categoria.findMany({
      where: {
        situacao: true // Filtre as categorias onde a propriedade 'ativada' seja verdadeira
      }
    });

    return categoriasAtivadas;
  }
}

export { ListarCategoriaServico };