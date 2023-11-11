import prismaClient from "../../prisma";
interface OrdemRequest{
    ordem_id:string;
}
class RemoverOrdemServico{
    async execute({ordem_id}:OrdemRequest){
        const removerOrdem = await prismaClient.ordem.delete({
            where:{
                id:ordem_id,
            }
        })

        return removerOrdem;
    }
}

export {RemoverOrdemServico}