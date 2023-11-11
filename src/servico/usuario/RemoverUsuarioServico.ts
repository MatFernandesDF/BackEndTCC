import prismaClient from "../../prisma";
interface OrdemRequest{
    user_id:string;
}
class RemoverOrdemServico{
    async execute({user_id}:OrdemRequest){
        const removerOrdem = await prismaClient.usuario.delete({
            where:{
                id:user_id,
            }
        })

        return removerOrdem;
    }
}

export {RemoverOrdemServico}