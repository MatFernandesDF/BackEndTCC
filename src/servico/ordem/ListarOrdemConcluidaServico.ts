import prismaClient from "../../prisma";

class ListarOrdemConcluidasServico{
  async execute(){

    const ordens = await prismaClient.ordem.findMany({
      where:{
        rascunho: false,
        status: true,
      },
      orderBy:{
        criado_em: 'desc'
      }
    })

    return ordens;

  }
}

export { ListarOrdemConcluidasServico }