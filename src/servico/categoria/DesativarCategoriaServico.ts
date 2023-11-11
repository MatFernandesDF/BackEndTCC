import prismaClient from "../../prisma";

interface CategoriaRequest{
  categoria_id: string;
}

class DesativarCategoriaServico{
  async execute({ categoria_id }: CategoriaRequest){
    const categoria = await prismaClient.categoria.update({
      where:{
        id: categoria_id
      },
      data:{
        situacao: false
      }
    })

    return categoria;

  }
}

export { DesativarCategoriaServico }