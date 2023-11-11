import prismaClient from "../../prisma";

interface ProdutoRequest{
  categoria_id: string;
}

class AtivarCategoriaServico{
  async execute({ categoria_id }: ProdutoRequest){
    const categoria = await prismaClient.categoria.update({
      where:{
        id: categoria_id
      },
      data:{
        situacao: true
      }
    })

    return categoria;

  }
}

export { AtivarCategoriaServico }