import prismaClient from "../../prisma";

interface DetalharProdutoRequest {
  produto_id: string;
}

class DetalharProdutoServico {
  async execute({ produto_id }: DetalharProdutoRequest) {
    const usuario = await prismaClient.produto.findUnique({
      where: {
        id: produto_id,
      },
    });

    return usuario;
  }
}

export { DetalharProdutoServico };