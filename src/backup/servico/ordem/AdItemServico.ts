import prismaClient from "../../prisma";

interface ItemRequest{
  quantia: number;
  ordem_id: string;
  produto_id: string;
  
}

class AdItemServico{
  async execute({ ordem_id, produto_id, quantia }: ItemRequest){

    const ordem = await prismaClient.item.create({
      data:{
        ordem_id: ordem_id,
        produto_id: produto_id,
        quantia
      }
    })

    return ordem;

  }
}

export { AdItemServico }