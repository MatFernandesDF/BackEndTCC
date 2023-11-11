import prismaClient from "../../prisma";

interface DetalharRequest{
    ordem_id:string;
}

class DetalharOrdemServico{
    async execute({ordem_id}:DetalharRequest){

        const ordens = await prismaClient.item.findMany({
            where:{
                ordem_id:ordem_id
            },
            include:{
                produto:true,
                ordem:true,
                

            }
               
        })  
        return ordens;


    }

}
export {DetalharOrdemServico}