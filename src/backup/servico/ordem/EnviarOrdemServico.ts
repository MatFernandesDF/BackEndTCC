import prismaClient from "../../prisma";

interface OrdemRequest{
  ordem_id: string;
}

class EnviarOrdemServico{
  async execute({ ordem_id }: OrdemRequest){
    const ordem = await prismaClient.ordem.update({
      where:{
        id: ordem_id
      },
      data:{
        rascunho: false
      }
    })

    return ordem;

  }
}

export { EnviarOrdemServico }