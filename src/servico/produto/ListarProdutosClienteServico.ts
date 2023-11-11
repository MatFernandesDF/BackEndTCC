import prismaClient from "../../prisma";

class ListarProdutosClienteServico {
  async execute() {
    const produtos = await prismaClient.produto.findMany({
      where: {
        disponibilidade: true, // Adicione esta condição para listar apenas produtos com disponibilidade: true
      },
    });

    return produtos;
  }
}

export { ListarProdutosClienteServico };