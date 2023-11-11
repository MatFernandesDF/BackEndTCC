import prismaClient from "../../prisma";

class ListarOrdemServicos{
  async execute(){

    const ordens = await prismaClient.ordem.findMany({
      where:{
        rascunho: false,
        status: false,
      },
      orderBy:{
        criado_em: 'desc'
      }
    })

    return ordens;

  }
}

export { ListarOrdemServicos }