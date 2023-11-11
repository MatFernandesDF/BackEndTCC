import prismaClient from "../../prisma";

interface ProdutoRequest{
  categoria_id:string;
}

class ListarPorCategoriaServico{
  async execute({ categoria_id }: ProdutoRequest){
    
    const produtoPorCategoria = await prismaClient.produto.findMany({
      where:{
        categoria_id: categoria_id
      }
    })

    return produtoPorCategoria;

  }
}

export { ListarPorCategoriaServico }