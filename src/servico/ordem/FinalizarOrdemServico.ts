import prismaClient from "../../prisma";

interface OrdemRequest{
  ordem_id: string;
}

class FinalizarOrdemServico{
  async execute({ ordem_id }: OrdemRequest){

    const ordem = await prismaClient.ordem.update({
      where:{
        id: ordem_id
      },
      data:{
        status: true,
      }
    })

    return ordem;

  }
}

export { FinalizarOrdemServico }