import prismaClient from "../../prisma";
interface ItemRequest{
   item_id:string;
}

class RemoverItemServico{
    async execute({item_id}:ItemRequest){

        const ordem = await prismaClient.item.delete({
            where:{
                id:item_id
            }
        })
    
        return ordem;

    }


    }

export{RemoverItemServico}