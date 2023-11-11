import prismaClient from "../../prisma";

class ListarProdutosServico {
  async execute() {
    const produto = await prismaClient.produto.findMany();

    return produto;
  }
}

export { ListarProdutosServico };