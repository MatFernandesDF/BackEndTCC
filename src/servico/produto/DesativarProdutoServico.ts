import prismaClient from "../../prisma";

interface ProdutoRequest{
  produto_id: string;
}

class DesativarProdutoServico{
  async execute({ produto_id }: ProdutoRequest){
    const produto = await prismaClient.produto.update({
      where:{
        id: produto_id
      },
      data:{
        disponibilidade: false
      }
    })

    return produto;

  }
}

export { DesativarProdutoServico }